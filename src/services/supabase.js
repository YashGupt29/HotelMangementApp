import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config;
export const supabaseUrl = "https://zkdkgrzzwdixahyrlkel.supabase.co";
//dont give me gyan about uploading the key i know already! supabase uses Row Level Security to avoid any injecting.
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprZGtncnp6d2RpeGFoeXJsa2VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI1NDE3MzQsImV4cCI6MjAxODExNzczNH0.YuoFa7GvwOrN98HJobC9Pf1iQR0DO-SWBgM0aUN_IoY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
