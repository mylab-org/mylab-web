import { headers } from 'next/headers'
import { UserPage } from '@/views/user'

export default async function User() {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <UserPage />
  } else {
    return <UserPage />
  }
}
