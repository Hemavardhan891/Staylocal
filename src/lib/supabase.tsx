import { createClient } from '@supabase/supabase-js';

// NEXT_PUBLIC_ prefix is MANDATORY for these to work in the browser
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase environment variables are missing!");
}

// This client ONLY uses the Public Anon Key
export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || ''
);