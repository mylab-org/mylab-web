import { MOCK_CALENDAR_EVENTS, MOCK_MEMBERS } from './model/mock'
import { CalendarMonthWrapper, CalendarRegisterSection } from '@/widgets/calendar'

export const CalendarPage = () => {
  return (
    <div className={'flex flex-1 gap-7.5 focus:outline-none'}>
      <CalendarMonthWrapper events={MOCK_CALENDAR_EVENTS} />
      <CalendarRegisterSection members={MOCK_MEMBERS} />
    </div>
  )
}
