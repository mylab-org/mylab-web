'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

const ITEM_HEIGHT = 44
const VISIBLE_ITEMS = 5
const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2)

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

/* ---------- Wheel 컴포넌트 ---------- */

function Wheel({
  items,
  width,
  initialIndex = 0,
  onChange,
}: {
  items: string[]
  width: string
  initialIndex?: number
  onChange: (v: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(initialIndex)
  const [scrollTop, setScrollTop] = useState(initialIndex * ITEM_HEIGHT)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ITEM_HEIGHT * initialIndex
    }
  }, [initialIndex])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const st = e.currentTarget.scrollTop
    setScrollTop(st)

    const nearest = Math.round(st / ITEM_HEIGHT)
    if (nearest !== index && nearest >= 0 && nearest < items.length) {
      setIndex(nearest)
      onChange(items[nearest])
    }
  }

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const direction = e.deltaY > 0 ? 1 : -1
      el.scrollTo({
        top: el.scrollTop + direction * ITEM_HEIGHT,
        behavior: 'smooth',
      })
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <div className={`relative ${width} overflow-hidden`} style={{ height: ITEM_HEIGHT * VISIBLE_ITEMS }}>
      {/* 1. 중앙 하이라이트 바 (가장 위에 배치) */}
      <div
        className="pointer-events-none absolute right-0 left-0 z-30 border-y border-gray-300 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        style={{ top: ITEM_HEIGHT * CENTER_INDEX, height: ITEM_HEIGHT }}
      />

      {/* 2. 스크롤 본체 */}
      <div
        ref={ref}
        onScroll={handleScroll}
        className="scrollbar-hidden h-full overflow-y-scroll"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        <div style={{ height: ITEM_HEIGHT * CENTER_INDEX }} />
        {items.map((item, i) => {
          // 중앙에 오면 1, 멀어지면 0.2
          const isSelected = i === index
          return (
            <div
              key={i}
              className="flex items-center justify-center"
              style={{ height: ITEM_HEIGHT, scrollSnapAlign: 'center' }}
            >
              <span
                className={`text-[22px] transition-all duration-150 ${
                  isSelected ? 'scale-105 font-bold text-black' : 'font-medium text-gray-300'
                }`}
              >
                {item}
              </span>
            </div>
          )
        })}
        <div style={{ height: ITEM_HEIGHT * CENTER_INDEX }} />
      </div>

      {/* 3. 상하단 페이드 마스크 */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-white/90 via-transparent to-white/90" />
    </div>
  )
}

/* ---------- 메인 컴포넌트 ---------- */
export default function TimePicker() {
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
