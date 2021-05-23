import { createClient } from "@supabase/supabase-js";

const supaClient = createClient(
  process.env.REACT_APP_SUPA_URL,
  process.env.REACT_APP_SUPA_PUBLIC_KEY,
  { autoRefreshToken: true }
);

export default supaClient;
