import { headers } from 'next/headers'
import { EmailValidatePage, MobileEmailValidatePage } from '@/views/auth/email-validate'

const EmailValidate = async () => {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <MobileEmailValidatePage />
  } else {
    return <EmailValidatePage />
  }
}

export default EmailValidate
