#!/usr/bin/env node
/**
 * Generates a PORTAL_PASSWORD_HASH value.
 *   node scripts/hash-password.mjs "your password here"
 */
import { scryptSync, randomBytes } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "your password"');
  process.exit(1);
}
if (password.length < 10) {
  console.error("Use at least 10 characters.");
  process.exit(1);
}

const salt = randomBytes(16);
const derived = scryptSync(password, salt, 64);
console.log(`PORTAL_PASSWORD_HASH="${salt.toString("hex")}:${derived.toString("hex")}"`);
console.log(`PORTAL_SESSION_SECRET="${randomBytes(32).toString("hex")}"`);
