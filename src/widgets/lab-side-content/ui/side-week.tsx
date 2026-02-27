import { CalendarListItem, CalendarWeek } from '@/entities/calendar'
import { ListItemTag, Text } from '@/shared/ui'

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
        <div className={'flex flex-col gap-[5px] rounded-[12px] border border-[#E2E3E5] px-[12px] py-[16px]'}>
          <div className={'flex items-center gap-[5px]'}>
            <ListItemTag.Red />
            <Text className={'text-[14px] font-bold'}>정기 미팅</Text>
          </div>
          <div>
            <Text className={'text-[14px] font-light'}>2025.12.11(목)</Text>
            <Text className={'text-[14px] font-light'}>8공 812호 세미나실</Text>
          </div>
        </div>
      </div>
    </div>
  )
}
