import { MOCK_CALENDAR_EVENTS, MOCK_MEMBERS } from './model/mock'
import { CalendarWrap, ScheduleRegisterWrap } from '@/widgets/calendar'

const CARD_STYLE = 'rounded-[24px] bg-white p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_4px_16px_rgba(0,0,0,0.04)]'

export const CalendarPage = () => {
  return (
    <div className={'flex flex-1 gap-7.5 focus:outline-none'}>
      <section className={`min-w-0 flex-1 ${CARD_STYLE}`}>
        <CalendarWrap events={MOCK_CALENDAR_EVENTS} />
      </section>
      <section className={`h-fit w-[560px] shrink-0 ${CARD_STYLE}`}>
        <ScheduleRegisterWrap members={MOCK_MEMBERS} />
      </section>
    </div>
  )
}
