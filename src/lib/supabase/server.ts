import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_SERVICE_KEY, SUPABASE_URL, supabaseConfigured } from "./env";

let cached: SupabaseClient | null = null;

/**
 * Server-side client. Uses the service role key when present so the portal can
 * write through RLS; falls back to the anon key for read-only public rendering.
 */
export function getServerSupabase(): SupabaseClient | null {
  if (!supabaseConfigured) return null;
  if (cached) return cached;
  cached = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY || SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-application-name": "perfect-detailing" } },
  });
  return cached;
}
