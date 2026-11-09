'use client'

import { useLabScheduleHook } from '../../../model/use-lab-schedule-hook'
import { SideWeek } from '../../side/side-week'
import { CalendarListItem, CalendarWeek } from '@/entities/calendar'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { Text } from '@/shared/ui/override/text'

export const LabScheduleSection = ({ isMobile = false }: { isMobile?: boolean }) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const { events, isPending } = useLabScheduleHook()

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
      <CalendarWeek />
      <div className={'flex flex-col gap-2.5'}>
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
