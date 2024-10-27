/* eslint-env node */

import { createClient } from '@supabase/supabase-js'
import { fakerEN_US as faker } from '@faker-js/faker'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
console.log(supabase)
