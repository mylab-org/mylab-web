'use client'

import { useState } from 'react'
import { useCalendarScheduleHook } from '../../../model/use-calendar-schedule-hook'
import type { CalendarType } from '@/entities/calendar'
import { CalendarTypeSelect, ScheduleRegisterForm } from '@/features/calendar'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'

interface CalendarRegisterSectionProps {
  className?: string
}

export const CalendarRegisterSection = ({ className }: CalendarRegisterSectionProps) => {
  const [type, setType] = useState<CalendarType>('CONFERENCE')
  const { members } = useCalendarScheduleHook()

  return (
    <section
      className={cn('bg-card flex h-fit w-[420px] shrink-0 flex-col gap-5 rounded-[20px] p-5', CARD_SHADOW, className)}
    >
      <div className={'flex items-center gap-1.25'}>
        <CalendarTypeSelect value={type} onChange={setType} />
        <h3 className={'text-[18px] leading-7 font-bold md:text-[22px] md:leading-8'}>등록하기</h3>
      </div>
      {/* 종류가 바뀌면 입력값을 초기화하기 위해 key 로 폼을 새로 마운트한다 */}
      <ScheduleRegisterForm key={type} type={type} members={members} />
    </section>
  )
}
