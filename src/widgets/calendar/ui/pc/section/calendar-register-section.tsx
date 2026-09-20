'use client'

import { useState } from 'react'
import type { CalendarType } from '@/entities/calendar'
import { CalendarTypeSelect, ScheduleRegisterForm } from '@/features/calendar'
import { cn } from '@/shared/lib'

interface CalendarRegisterSectionProps {
  members: string[]
  className?: string
}

export const CalendarRegisterSection = ({ members, className }: CalendarRegisterSectionProps) => {
  const [type, setType] = useState<CalendarType>('CONFERENCE')

  return (
    <section
      className={cn(
        'flex h-fit w-[560px] shrink-0 flex-col gap-7.5 rounded-[24px] bg-white p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_4px_16px_rgba(0,0,0,0.04)]',
        className,
      )}
    >
      <div className={'flex items-center gap-1.25'}>
        <CalendarTypeSelect value={type} onChange={setType} />
        <h3 className={'text-[20px] leading-8 font-bold lg:text-[24px]'}>등록하기</h3>
      </div>
      {/* 종류가 바뀌면 입력값을 초기화하기 위해 key 로 폼을 새로 마운트한다 */}
      <ScheduleRegisterForm key={type} type={type} members={members} />
    </section>
  )
}
