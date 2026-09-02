import "server-only";
import { createHmac, timingSafeEqual, scryptSync, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Portal authentication.
 *
 * A signed, HTTP-only session cookie. Credentials come from the environment
 * so they are never in the repository; the development fallback is loud about
 * being a fallback and is refused outright in production.
 */

const COOKIE = "pd_portal";
const MAX_AGE = 60 * 60 * 12; // 12 hours

const DEV_EMAIL = "hello@perfectdetailing.co.za";
const DEV_PASSWORD = "perfect-detailing";

function secret(): string {
  const fromEnv = process.env.PORTAL_SESSION_SECRET;
  if (fromEnv && fromEnv.length >= 16) return fromEnv;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "PORTAL_SESSION_SECRET must be set to at least 16 characters in production.",
    );
  }
  return "development-only-portal-secret";
}

export interface Session {
  email: string;
  name: string;
  role: "owner" | "manager" | "staff";
  issuedAt: number;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

function encode(session: Session): string {
  const payload = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function decode(token: string): Session | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString()) as Session;
    if (Date.now() - session.issuedAt > MAX_AGE * 1000) return null;
    return session;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* Credentials                                                         */
/* ------------------------------------------------------------------ */

/** `scrypt` hash in the form `salt:hash`, both hex. */
export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const derived = scryptSync(password, salt, 64);
  return `${salt.toString("hex")}:${derived.toString("hex")}`;
}

function verifyHashed(password: string, stored: string): boolean {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  try {
    const derived = scryptSync(password, Buffer.from(saltHex, "hex"), 64);
    const expected = Buffer.from(hashHex, "hex");
    return derived.length === expected.length && timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}

function constantTimeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB);
}

export function usingDefaultCredentials(): boolean {
  return !process.env.PORTAL_PASSWORD_HASH && !process.env.PORTAL_PASSWORD;
}

export function verifyCredentials(email: string, password: string): Session | null {
  const expectedEmail = (process.env.PORTAL_EMAIL ?? DEV_EMAIL).toLowerCase().trim();
  const given = email.toLowerCase().trim();
  if (!constantTimeEquals(given, expectedEmail)) return null;

  const hash = process.env.PORTAL_PASSWORD_HASH;
  const plain = process.env.PORTAL_PASSWORD;

  let ok = false;
  if (hash) ok = verifyHashed(password, hash);
  else if (plain) ok = constantTimeEquals(password, plain);
  else if (process.env.NODE_ENV !== "production") ok = constantTimeEquals(password, DEV_PASSWORD);

  if (!ok) return null;

  return {
    email: expectedEmail,
    name: process.env.PORTAL_NAME ?? "Perfect Detailing",
    role: "owner",
    issuedAt: Date.now(),
  };
}

/* ------------------------------------------------------------------ */
/* Session lifecycle                                                   */
/* ------------------------------------------------------------------ */

export async function createSession(session: Session): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE, encode(session), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getSession(): Promise<Session | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  return token ? decode(token) : null;
}

export const SESSION_COOKIE = COOKIE;
