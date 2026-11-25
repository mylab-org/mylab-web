'use client'

import { useEffect, useState } from 'react'
import { ITEM_HEIGHT_PX, ROLL_INTERVAL_MS } from '../config/const'
import { DUMMY_NOTICES } from '../config/dummy'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'

type Props = {
  className?: string
}

export const NoticeMobileBanner = ({ className }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduceMotion || DUMMY_NOTICES.length <= 1) return

    const timer = window.setInterval(() => {
      setActiveIndex(prev => (prev + 1) % DUMMY_NOTICES.length)
    }, ROLL_INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [reduceMotion])

  if (DUMMY_NOTICES.length === 0) return null

  return (
    <div
      className={cn('bg-card flex items-center gap-2 rounded-[10px] px-4 py-2.5', CARD_SHADOW, className)}
      aria-live={'polite'}
      aria-label={'공지사항'}
    >
      <span
        className={'bg-brand text-brand-foreground shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide'}
      >
        공지
      </span>

      <div className={'relative min-w-0 flex-1 overflow-hidden'} style={{ height: ITEM_HEIGHT_PX }}>
        <ul
          className={cn('flex flex-col', !reduceMotion && 'transition-transform duration-500 ease-out')}
          style={{
            transform: reduceMotion ? undefined : `translateY(-${activeIndex * ITEM_HEIGHT_PX}px)`,
          }}
        >
          {(reduceMotion ? [DUMMY_NOTICES[activeIndex]] : DUMMY_NOTICES).map(notice => (
            <li key={notice.id} className={'flex items-center'} style={{ height: ITEM_HEIGHT_PX }}>
              <Text className={'text-foreground! line-clamp-1 text-[13px] font-medium'}>{notice.title}</Text>
            </li>
          ))}
        </ul>
      </div>

      {/* TODO: 공지 전체 목록 연결 전 클릭 보류 */}
      <button type={'button'} className={'text-subtle-foreground shrink-0 text-[12px] font-medium whitespace-nowrap'}>
        전체보기
      </button>
    </div>
  )
}
