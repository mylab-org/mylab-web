import { headers } from 'next/headers'
import { CalendarPage, MobileCalendarPage } from '@/views/(loggedIn)/calendar'

export default async function Calendar() {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <MobileCalendarPage />
  } else {
    return <CalendarPage />
  }
}
