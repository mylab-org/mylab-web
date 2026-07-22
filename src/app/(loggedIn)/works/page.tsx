import { headers } from 'next/headers'
import { WorkPage } from '@/views/works'
import { MobileWorkPage } from '@/views/works/mobile-work-page'

export default async function Works() {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <MobileWorkPage />
  } else {
    return <WorkPage />
  }
}
