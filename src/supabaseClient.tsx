import { createClient } from '@supabase/supabase-js'

// Intialize Supabase and export it
export const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL, 
    import.meta.env.VITE_SUPABASE_KEY
)
