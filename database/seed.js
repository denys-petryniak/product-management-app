/* eslint-env node */
import { createClient } from '@supabase/supabase-js'
import { fakerEN_US as faker } from '@faker-js/faker'

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

const seedProjects = async () => {
  const name = faker.lorem.words(3)

  const { error } = await supabase.from('projects').insert({
    name,
    slug: faker.helpers.slugify(name),
    status: faker.helpers.arrayElement(['in-progress', 'completed']),
    collaborators: faker.helpers.arrayElements([1, 2, 3]),
  })

  if (error) {
    console.error(error)
  }
}

await seedProjects()
