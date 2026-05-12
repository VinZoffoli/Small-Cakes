import { createClient } from "@supabase/supabase-js";

function requirePublicEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`[supabase] Missing environment variable: ${name}`);
  }
  return value;
}

const requiredPublicEnv = {
  supabaseUrl: requirePublicEnv(
    "NEXT_PUBLIC_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SUPABASE_URL
  ),
  supabaseAnonKey: requirePublicEnv(
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ),
  clientId: requirePublicEnv(
    "NEXT_PUBLIC_CLIENT_ID",
    process.env.NEXT_PUBLIC_CLIENT_ID
  ),
};

export const supabaseClientId = requiredPublicEnv.clientId;

export const supabase = createClient(
  requiredPublicEnv.supabaseUrl,
  requiredPublicEnv.supabaseAnonKey
);
