import { headers } from 'next/headers'
import { LoginPage, MobileLoginPage } from '@/views/auth/login'
import TestPage from '@/views/auth/login/TestPage'

const Login = async () => {
  // return <LoginPage />
  // return <TestPage />
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <MobileLoginPage />
  } else {
    return <TestPage />
  }
}

export default Login
