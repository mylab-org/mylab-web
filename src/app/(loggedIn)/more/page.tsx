import { headers } from 'next/headers'
import { MobileMorePage, MorePage } from '@/views/(loggedIn)/more'

export default async function User() {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <MobileMorePage />
  } else {
    return <MorePage />
  }
}
