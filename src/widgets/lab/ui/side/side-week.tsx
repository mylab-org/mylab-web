'use client'

import { useLabScheduleHook } from '../../model/use-lab-schedule-hook'
import { CalendarListItem, CalendarWeek, formatDateLabel, toDateKey } from '@/entities/calendar'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { Text } from '@/shared/ui/override/text'

export const SideWeek = () => {
  const closeSideModal = useSideModalStore(state => state.closeSideModal)
  const { events, listEvents, selectedDate, setSelectedDate, handleSelectDate, goToCalendar, isPending } =
    useLabScheduleHook()

  const handleMoveToCalendar = () => {
    closeSideModal()
    goToCalendar()
  }

  return (
    <div className={'flex h-full min-h-0 w-full flex-col gap-3.75 px-5 pb-5 lg:w-[750px] lg:px-7.5'}>
      <CalendarWeek events={events} selectedDate={selectedDate} onSelectDate={handleSelectDate} />

      {selectedDate && (
        <div className={'flex items-center justify-between gap-2'}>
          <Text className={'text-[14px] font-semibold'}>
            {formatDateLabel(toDateKey(selectedDate))}
            <span className={'text-subtle-foreground ml-1.5 text-[13px] font-semibold'}>{listEvents.length}</span>
          </Text>
          <button
            type={'button'}
            className={'text-brand cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-semibold'}
            onClick={() => setSelectedDate(null)}
          >
            이번 주 전체 보기
          </button>
        </div>
      )}

      <div className={'flex flex-1 flex-col gap-3.75 overflow-scroll'}>
        {isPending ? (
          <Text className={'text-subtle-foreground py-5 text-center text-[14px]'}>일정을 불러오는 중입니다</Text>
        ) : listEvents.length === 0 ? (
          <Text className={'text-subtle-foreground py-5 text-center text-[14px]'}>
            {selectedDate ? '선택한 날짜에 일정이 없습니다' : '이번 주 일정이 없습니다'}
          </Text>
        ) : (
          listEvents.map(event => <CalendarListItem key={event.key} event={event} onClick={handleMoveToCalendar} />)
        )}
      </div>
    </div>
  )
}
