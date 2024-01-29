import { redirect } from 'next/navigation'
import LoginForm from './loginForm'
import { readUserSession } from '@/lib/actions'

export default async function Login () {
  const { data } = await readUserSession()

  if (data.session) {
    return redirect('/')
  }

  return (
      <LoginForm />
  )
}
