import { supabase } from '@/lib/supabaseClient'
import type { LoginForm, RegisterForm } from '@/types/AuthForm'

const authStore = useAuthStore()

export const register = async (formData: RegisterForm) => {
  const { data, error } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
  })

  if (error) return console.error(error)

  if (data.user) {
    const { error } = await supabase.from('profiles').insert({
      id: data.user.id,
      username: formData.userName,
      full_name: `${formData.firstName} ${formData.lastName}`,
    })

    if (error) return console.error('Profiles error', error)
  }

  await authStore.setAuth(data.session)

  return true
}

export const login = async (formData: LoginForm) => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })

  if (error) return console.error(error)

  await authStore.setAuth(data.session)

  return true
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) return console.error(error)

  await authStore.setAuth(null)

  return true
}
