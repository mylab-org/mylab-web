import { headers } from 'next/headers'
import { LoginPage, MobileLoginPage } from '@/views/(loggedOut)/login'

const Login = async () => {
  const header = await headers()
  const userAgent = header.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(userAgent)) {
    return <MobileLoginPage />
  } else {
    return <LoginPage />
  }
}

export default Login
