import { CalendarListItem, CalendarWeek } from '@/entities/calendar'

export const SideWeek = () => {
  return (
    <div className={'flex h-full min-h-0 w-full flex-col gap-3.75 px-5 pb-5 lg:w-[750px] lg:px-7.5'}>
      <CalendarWeek />
      <div className={'flex flex-1 flex-col gap-3.75 overflow-scroll'}>
        <CalendarListItem />
        <CalendarListItem />
        <CalendarListItem />
        <CalendarListItem />
        <CalendarListItem />
        <CalendarListItem />
      </div>
    </div>
  )
}
