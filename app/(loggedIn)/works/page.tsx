import { headers } from 'next/headers'
import { WorkPage } from '@/views/works'

export default async function Works() {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <WorkPage />
  } else {
    return <WorkPage />
  }
}
