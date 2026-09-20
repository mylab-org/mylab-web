import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { EmailValidatePage, MobileEmailValidatePage } from '@/views/(loggedOut)/email-validate'

type EmailValidatePageProps = {
  searchParams: Promise<{ token?: string }>
}

const EmailValidate = async ({ searchParams }: EmailValidatePageProps) => {
  const { token } = await searchParams
  const h = await headers()
  const ua = h.get('user-agent') ?? ''

  if (!token) redirect('/not-found')

  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <MobileEmailValidatePage token={token} />
  }

  return <EmailValidatePage token={token} />
}

export default EmailValidate
