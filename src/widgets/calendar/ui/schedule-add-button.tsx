'use client'

import { PlusIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { CalendarType } from '@/entities/calendar'
import { CALENDAR_TYPE } from '@/shared/constant/tag'

interface ScheduleAddButtonProps {
  onSelect: (type: CalendarType) => void
}

const TYPES = Object.keys(CALENDAR_TYPE) as CalendarType[]

export const ScheduleAddButton = ({ onSelect }: ScheduleAddButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleSelect = (type: CalendarType) => {
    setIsOpen(false)
    onSelect(type)
  }

  return (
    <div ref={ref} className={'relative'}>
      <button
        type={'button'}
        aria-label={'일정 등록하기'}
        aria-expanded={isOpen}
        className={'cursor-pointer text-gray-900'}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <PlusIcon size={24} />
      </button>
      {isOpen && (
        <ul
          className={
            'absolute top-full right-0 z-30 mt-2 w-[150px] overflow-hidden rounded-[12px] bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.08),0px_4px_16px_rgba(0,0,0,0.08)]'
          }
        >
          {TYPES.map(type => (
            <li key={type}>
              <button
                type={'button'}
                className={'w-full cursor-pointer px-4 py-3 text-left text-[14px] font-medium hover:bg-gray-50'}
                onClick={() => handleSelect(type)}
              >
                {CALENDAR_TYPE[type].NAME} 등록하기
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
