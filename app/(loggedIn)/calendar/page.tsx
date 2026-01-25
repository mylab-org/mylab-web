import { headers } from 'next/headers'
import { CalendarPage } from '@/views/calendar'

export default async function Calendar() {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <CalendarPage />
  } else {
    return <CalendarPage />
  }
}
