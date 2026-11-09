'use client'

import { useLabScheduleHook } from '../../model/use-lab-schedule-hook'
import { CalendarListItem, CalendarWeek } from '@/entities/calendar'
import { Text } from '@/shared/ui/override/text'

export const SideWeek = () => {
  const { events, isPending } = useLabScheduleHook()

  return (
    <div className={'flex h-full min-h-0 w-full flex-col gap-3.75 px-5 pb-5 lg:w-[750px] lg:px-7.5'}>
      <CalendarWeek />
      <div className={'flex flex-1 flex-col gap-3.75 overflow-scroll'}>
        {isPending ? (
          <Text className={'text-subtle-foreground py-5 text-center text-[14px]'}>일정을 불러오는 중입니다</Text>
        ) : events.length === 0 ? (
          <Text className={'text-subtle-foreground py-5 text-center text-[14px]'}>이번 주 일정이 없습니다</Text>
        ) : (
          events.map(event => <CalendarListItem key={event.key} event={event} />)
        )}
      </div>
    </div>
  )
}
