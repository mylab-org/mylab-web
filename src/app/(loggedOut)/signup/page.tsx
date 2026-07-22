import { headers } from 'next/headers'
import { MobileSignupPage, SignupPage } from '@/views/(loggedOut)/signup'

const Regist = async () => {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <MobileSignupPage />
  } else {
    return <SignupPage />
  }
}

export default Regist
