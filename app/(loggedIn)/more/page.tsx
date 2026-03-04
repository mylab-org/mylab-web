import { headers } from 'next/headers'
import { MorePage } from '@/views/more'

export default async function User() {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <MorePage />
  } else {
    return <MorePage />
  }
}
