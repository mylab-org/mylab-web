'use client'

import { useState } from 'react'
import type { CalendarType } from '@/entities/calendar'
import type { LabsMembersResponseType } from '@/entities/labs/model/types'
import { CalendarTypeSelect, ScheduleRegisterForm } from '@/features/calendar'

interface CalendarRegisterContentProps {
  members: LabsMembersResponseType[]
  initialType: CalendarType
  onRegistered: () => void
}

export const CalendarRegisterContent = ({ members, initialType, onRegistered }: CalendarRegisterContentProps) => {
  const [type, setType] = useState<CalendarType>(initialType)

  return (
    <div
      className={'scrollbar-hidden flex min-h-0 w-full flex-1 flex-col gap-5 overflow-y-auto px-5 pb-5 lg:w-[520px]'}
    >
      <CalendarTypeSelect value={type} onChange={setType} />
      <ScheduleRegisterForm key={type} type={type} members={members} onRegistered={onRegistered} />
    </div>
  )
}
