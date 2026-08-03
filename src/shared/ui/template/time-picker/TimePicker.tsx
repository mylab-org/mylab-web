'use client'

import { useMemo, useState } from 'react'
import { Wheel } from '@/shared/ui/wheel'

const WEEK = ['일', '월', '화', '수', '목', '금', '토']

/* ---------- 데이터 생성 ---------- */
function createDates() {
  const today = new Date()
  const arr: string[] = []
  for (let i = 0; i < 30; i++) {
    const d = new Date()
    d.setDate(today.getDate() + i)
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    const w = WEEK[d.getDay()]
    if (i === 0) arr.push(`오늘 (${w})`)
    else arr.push(`${m}/${day}(${w})`)
  }
  return arr
}

const createHours = () => Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'))
const createMinutes = () => Array.from({ length: 6 }, (_, i) => String(i * 10).padStart(2, '0'))

/* ---------- 메인 컴포넌트 ---------- */
export const TimePicker = () => {
  const dates = useMemo(() => createDates(), [])
  const hours = useMemo(() => createHours(), [])
  const minutes = useMemo(() => createMinutes(), [])

  const now = new Date()

  const [date, setDate] = useState(dates[0])
  const [hour, setHour] = useState(String(now.getHours()).padStart(2, '0'))
  const [minute, setMinute] = useState(String(Math.floor(now.getMinutes() / 10) * 10).padStart(2, '0'))

  return (
    <div className="flex items-center justify-center gap-7 bg-white">
      <Wheel items={dates} width="w-[160px]" onChange={setDate} />
      <Wheel items={hours} width="w-[70px]" initialIndex={now.getHours()} onChange={setHour} />
      <div className="pb-1 text-[26px] font-semibold text-black/80">:</div>
      <Wheel items={minutes} width="w-[70px]" initialIndex={Math.floor(now.getMinutes() / 10)} onChange={setMinute} />
    </div>
  )
}
