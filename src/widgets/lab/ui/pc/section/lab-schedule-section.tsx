'use client'

import { useLabScheduleHook } from '../../../model/use-lab-schedule-hook'
import { SideWeek } from '../../side/side-week'
import { CalendarListItem, CalendarWeek, formatDateLabel, toDateKey } from '@/entities/calendar'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { Text } from '@/shared/ui/override/text'

export const LabScheduleSection = ({ isMobile = false }: { isMobile?: boolean }) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const { events, listEvents, selectedDate, setSelectedDate, handleSelectDate, goToCalendar, isPending } =
    useLabScheduleHook()

  return (
    <div
      className={cn(
        'bg-card flex w-full flex-col gap-3.5 rounded-[20px] p-5 md:p-6',
        CARD_SHADOW,
        !isMobile && 'min-h-0 flex-1',
      )}
    >
      <div className={'flex items-center justify-between gap-2'}>
        <h3 className={'text-[18px] leading-7 font-bold md:text-[22px] md:leading-8'}>이번 주 일정</h3>
        {isMobile && (
          <button type={'button'} className={'shrink-0'} onClick={() => openSideModal(SideWeek, '주간 연구실 일정')}>
            <Text className={'text-brand! text-[12px] font-medium'}>전체 보기</Text>
          </button>
        )}
      </div>

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

      <div className={'flex flex-col gap-2.5'}>
        {isPending ? (
          <Text className={'text-subtle-foreground py-5 text-center text-[14px]'}>일정을 불러오는 중입니다</Text>
        ) : listEvents.length === 0 ? (
          <Text className={'text-subtle-foreground py-5 text-center text-[14px]'}>
            {selectedDate ? '선택한 날짜에 일정이 없습니다' : '이번 주 일정이 없습니다'}
          </Text>
        ) : (
          listEvents.map(event => <CalendarListItem key={event.key} event={event} onClick={goToCalendar} />)
        )}
      </div>
    </div>
  )
}
