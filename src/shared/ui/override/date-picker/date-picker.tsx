'use client'

import { ko } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/shared/lib'
import { formatDate } from '@/shared/lib/format'
import { Calendar, CalendarDayButton } from '@/shared/ui/shadcn/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn/popover'
import type { DateRange } from 'react-day-picker'

type DateRangePickerProps = {
  startAt?: string
  endAt?: string
  onChange: (startAt: string, endAt: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

const parseDateInput = (value: string) => {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const toRange = (startAt?: string, endAt?: string): DateRange | undefined => {
  if (!startAt) return undefined
  return {
    from: parseDateInput(startAt),
    to: endAt ? parseDateInput(endAt) : undefined,
  }
}

export const DateRangePicker = ({
  startAt,
  endAt,
  onChange,
  placeholder = '기간을 선택하세요',
  disabled = false,
  className,
}: DateRangePickerProps) => {
  const [open, setOpen] = useState(false)
  const selected = toRange(startAt, endAt)

  const label = (() => {
    if (startAt && endAt) {
      return `${formatDate(parseDateInput(startAt))} ~ ${formatDate(parseDateInput(endAt))}`
    }
    if (startAt) {
      return `${formatDate(parseDateInput(startAt))} ~ 종료일`
    }
    return placeholder
  })()

  return (
    <Popover modal={false} open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'flex w-full min-w-0 items-center justify-between gap-1 border-0 border-b-2 border-b-gray-300 bg-transparent px-0 py-2.5 text-left text-[14px] font-medium shadow-none outline-none md:text-[18px]',
            'focus-visible:border-b-gray-300',
            'disabled:cursor-not-allowed disabled:opacity-50',
            startAt ? 'text-gray-900' : 'text-gray-400',
            className,
          )}
        >
          <span className="truncate">{label}</span>
          <CalendarIcon className="size-4 shrink-0 text-gray-400 md:size-5" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto rounded-[16px] border-0 bg-white p-3 shadow-[0px_1px_3px_rgba(0,0,0,0.08),0px_4px_16px_rgba(0,0,0,0.12)] ring-0"
        onOpenAutoFocus={event => event.preventDefault()}
      >
        <Calendar
          mode="range"
          locale={ko}
          captionLayout="dropdown"
          showOutsideDays
          startMonth={new Date(1900, 0)}
          endMonth={new Date(2100, 11)}
          numberOfMonths={1}
          selected={selected}
          defaultMonth={selected?.from}
          className="bg-transparent p-0 [--cell-radius:9999px] [--cell-size:2.25rem]"
          classNames={{
            dropdowns: 'flex h-(--cell-size) w-full items-center justify-center gap-1.5',
            dropdown_root:
              'relative rounded-[8px] border border-gray-300 bg-white px-2 py-1 text-[13px] font-medium text-gray-900',
            dropdown: 'absolute inset-0 cursor-pointer opacity-0',
            caption_label:
              'flex items-center gap-1 text-[13px] font-bold text-gray-900 select-none [&>svg]:size-3.5 [&>svg]:text-gray-400',
            weekday: 'flex-1 text-[12px] font-medium text-[#6B7280] select-none',
            today: 'rounded-full border-2 border-dark bg-transparent text-gray-900',
            outside: 'text-gray-300 opacity-100',
            disabled: 'text-gray-300 opacity-40',
            range_start: 'rounded-l-full bg-gray-100',
            range_middle: 'rounded-none bg-gray-100',
            range_end: 'rounded-r-full bg-gray-100',
            day: 'aspect-square h-full w-full p-0 text-center',
          }}
          components={{
            DayButton: ({ className: dayClassName, modifiers, ...props }) => (
              <CalendarDayButton
                {...props}
                modifiers={modifiers}
                className={cn(
                  'rounded-full text-[14px] font-medium hover:bg-gray-100',
                  modifiers.outside ? 'text-gray-300!' : 'text-gray-900',
                  'data-[range-start=true]:bg-dark data-[range-start=true]:rounded-full data-[range-start=true]:text-white!',
                  'data-[range-end=true]:bg-dark data-[range-end=true]:rounded-full data-[range-end=true]:text-white!',
                  'data-[range-middle=true]:rounded-none data-[range-middle=true]:bg-transparent data-[range-middle=true]:text-gray-900',
                  'data-[selected-single=true]:bg-dark data-[selected-single=true]:text-white!',
                  'group-data-[focused=true]/day:border-0 group-data-[focused=true]/day:ring-0',
                  dayClassName,
                )}
              />
            ),
          }}
          onSelect={range => {
            if (!range?.from) {
              onChange('', '')
              return
            }

            onChange(formatDate(range.from), range.to ? formatDate(range.to) : '')
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
