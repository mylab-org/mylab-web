import { headers } from 'next/headers'
import { MainPage, MobileMainPage } from '@/views/(loggedIn)/home'

export default async function Home() {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  // console.log('eee', ua, /Android|iPhone|iPad|iPod|Mobile/i.test(ua))
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <MobileMainPage />
  } else {
    return <MainPage />
  }
}
