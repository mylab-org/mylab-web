'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib'

export const ITEM_HEIGHT = 44
export const VISIBLE_ITEMS = 5
export const CENTER_INDEX = Math.floor(VISIBLE_ITEMS / 2)

/** 휠 전체 높이 / 가운데 선택 영역의 시작 위치 (하이라이트 바를 밖에서 그릴 때 사용) */
export const WHEEL_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS
export const WHEEL_CENTER_OFFSET = ITEM_HEIGHT * CENTER_INDEX

interface WheelProps {
  items: string[]
  width: string
  initialIndex?: number
  onChange: (value: string) => void
  /** 가운데 하이라이트 바를 휠 밖에서 그릴 경우 false */
  showHighlight?: boolean
  /** 선택된 항목 글자 크기 등 조정용 */
  itemClassName?: string
}

/** iOS 피커 느낌의 세로 휠. TimePicker / MonthPicker 에서 공용으로 사용한다. */
export const Wheel = ({
  items,
  width,
  initialIndex = 0,
  onChange,
  showHighlight = true,
  itemClassName,
}: WheelProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(initialIndex)
  /** 항목 클릭으로 이동하는 중에는 지나치는 항목이 선택되지 않도록 막는다 */
  const isAnimatingRef = useRef<boolean>(false)
  const animationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ITEM_HEIGHT * initialIndex
    }
  }, [initialIndex])

  useEffect(() => () => clearTimeout(animationTimerRef.current ?? undefined), [])

  const selectIndex = (next: number) => {
    if (next === index || next < 0 || next >= items.length) return
    setIndex(next)
    onChange(items[next])
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isAnimatingRef.current) return
    selectIndex(Math.round(e.currentTarget.scrollTop / ITEM_HEIGHT))
  }

  /** 위/아래 항목을 누르면 가운데로 부드럽게 이동한다 */
  const handleItemClick = (next: number) => {
    isAnimatingRef.current = true
    clearTimeout(animationTimerRef.current ?? undefined)
    animationTimerRef.current = setTimeout(() => {
      isAnimatingRef.current = false
    }, 500)

    ref.current?.scrollTo({ top: next * ITEM_HEIGHT, behavior: 'smooth' })
    selectIndex(next)
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
    <div className={`relative ${width} overflow-hidden`} style={{ height: WHEEL_HEIGHT }}>
      {showHighlight && (
        <div
          className="pointer-events-none absolute right-0 left-0 z-30 border-y border-gray-300 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
          style={{ top: WHEEL_CENTER_OFFSET, height: ITEM_HEIGHT }}
        />
      )}

      <div
        ref={ref}
        onScroll={handleScroll}
        className="scrollbar-hidden h-full overflow-y-scroll"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        <div style={{ height: WHEEL_CENTER_OFFSET }} />
        {items.map((item, i) => (
          <button
            key={item}
            type="button"
            tabIndex={-1}
            className="flex w-full cursor-pointer items-center justify-center"
            style={{ height: ITEM_HEIGHT, scrollSnapAlign: 'center' }}
            onClick={() => handleItemClick(i)}
          >
            <span
              className={cn(
                'text-[22px] transition-all duration-150',
                i === index ? 'scale-105 font-bold text-black' : 'font-medium text-gray-300',
                itemClassName,
              )}
            >
              {item}
            </span>
          </button>
        ))}
        <div style={{ height: WHEEL_CENTER_OFFSET }} />
      </div>

      {/* 상하단 페이드 마스크 */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-white/90 via-transparent to-white/90" />
    </div>
  )
}
