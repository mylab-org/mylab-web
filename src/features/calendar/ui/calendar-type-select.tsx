'use client'

import type { CalendarType } from '@/entities/calendar'
import { CALENDAR_TYPE } from '@/shared/constant/tag'
import { Select, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/shared/ui/shadcn'
import { SelectContent } from '@/shared/ui/shadcn/select'

interface CalendarTypeSelectProps {
  value: CalendarType
  onChange: (type: CalendarType) => void
}

const TYPES = Object.keys(CALENDAR_TYPE) as CalendarType[]

export const CalendarTypeSelect = ({ value, onChange }: CalendarTypeSelectProps) => {
  return (
    <Select value={value} onValueChange={selected => onChange(selected as CalendarType)}>
      <SelectTrigger className={'h-auto rounded-[12px] border-none bg-gray-100 text-[20px] font-bold'}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        position={'popper'}
        sideOffset={4}
        color={'white'}
        className={'border-none text-[16px] font-medium ring-0'}
      >
        <SelectGroup>
          <SelectLabel className={'text-[14px] text-gray-400'}>일정</SelectLabel>
          {TYPES.map(type => (
            <SelectItem key={type} value={type} className={'text-[16px] font-medium'}>
              {CALENDAR_TYPE[type].NAME}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
