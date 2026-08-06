'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Button } from '@/shared/ui/override/button'
import { ITEM_HEIGHT, Wheel, WHEEL_CENTER_OFFSET } from '@/shared/ui/wheel'

interface MonthPickerProps {
  /** 현재 보고 있는 달 */
  currentDate: Date
  /** 확인을 눌렀을 때만 실제 달이 바뀐다 */
  onConfirm: (date: Date) => void
  onClose: () => void
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** 현재 연도 기준으로 앞뒤 몇 년까지 고를 수 있는지 */
const YEAR_RANGE = 5

export const MonthPicker = ({ currentDate, onConfirm, onClose }: MonthPickerProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [draftDate, setDraftDate] = useState<Date>(currentDate)

  const years = useMemo(() => {
    const thisYear = new Date().getFullYear()
    return Array.from({ length: YEAR_RANGE * 2 + 1 }, (_, i) => String(thisYear - YEAR_RANGE + i))
  }, [])

  /** 휠이 스스로 스크롤 위치를 잡도록 마운트 시점 값만 넘긴다 */
  const [initialIndex] = useState(() => ({
    month: currentDate.getMonth(),
    year: years.indexOf(String(currentDate.getFullYear())),
  }))

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  const handleMonthChange = (label: string) => {
    setDraftDate(prev => new Date(prev.getFullYear(), MONTH_LABELS.indexOf(label), 1))
  }

  const handleYearChange = (year: string) => {
    setDraftDate(prev => new Date(Number(year), prev.getMonth(), 1))
  }

  const handleConfirm = () => {
    onConfirm(draftDate)
    onClose()
  }

  return (
    <div
      ref={ref}
      className={
        'absolute top-full left-1/2 z-40 mt-2 flex -translate-x-1/2 flex-col gap-2.5 rounded-[16px] bg-white px-5 py-2.5 shadow-[0px_1px_3px_rgba(0,0,0,0.08),0px_4px_16px_rgba(0,0,0,0.12)]'
      }
    >
      <div className={'relative flex items-center'}>
        {/* 두 휠을 가로지르는 하나의 선택 영역 표시 */}
        <div
          className={'pointer-events-none absolute right-0 left-0 z-30 border-y border-gray-300'}
          style={{ top: WHEEL_CENTER_OFFSET, height: ITEM_HEIGHT }}
        />
        <Wheel
          items={MONTH_LABELS}
          width={'w-[80px]'}
          initialIndex={initialIndex.month}
          onChange={handleMonthChange}
          showHighlight={false}
          itemClassName={'text-[18px]'}
        />
        <Wheel
          items={years}
          width={'w-[80px]'}
          initialIndex={initialIndex.year}
          onChange={handleYearChange}
          showHighlight={false}
          itemClassName={'text-[18px]'}
        />
      </div>
      <Button className={'w-full py-1.75 text-[14px]!'} onClick={handleConfirm}>
        확인
      </Button>
    </div>
  )
}
