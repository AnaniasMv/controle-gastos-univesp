import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sejqbiovuwsjcowncypy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlanFiaW92dXdzamNvd25jeXB5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1NjU2OTUsImV4cCI6MjA2MjE0MTY5NX0.qTNPdms7FeXNOpW_nIVdn4bmbtYfNrS_3nVAnN_2Kjs'

export const supabase = createClient(supabaseUrl, supabaseKey)
