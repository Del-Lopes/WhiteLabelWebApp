
/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://szsqwguxofmpuzogfrxz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6c3F3Z3V4b2ZtcHV6b2dmcnh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMjQ3ODMsImV4cCI6MjA4NjgwMDc4M30.xXVAO5DiFJzPLGnM9KQDHR3otGp1kE7iQbvLM5Do4UI';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.log('Using production fallback for Supabase credentials.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
