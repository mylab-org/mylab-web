import { CalendarListItem, CalendarWeek } from '@/entities/calendar'

export const SideWeek = () => {
  return (
    <div className={'flex h-full min-h-0 w-full flex-col gap-[15px] px-[20px] pb-5 lg:w-[750px] lg:px-[30px]'}>
      <CalendarWeek />
      <div className={'flex flex-1 flex-col gap-[15px] overflow-scroll'}>
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
