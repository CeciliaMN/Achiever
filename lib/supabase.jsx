import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://fzuouaoxilkdvhmbbfcg.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6dW91YW94aWxrZHZobWJiZmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzNDc4MjgsImV4cCI6MjA3NTkyMzgyOH0.fH6za3p9VgC5frmktIk7vXhQBINq1Q7xo4plK9vBHyk'

export const APP_URL = 'https://192.168.11.228:8081'
export const EXPO_APP_URL = 'exp://192.168.11.228:8081'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  },
})