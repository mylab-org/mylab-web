'use client'

import { useEffect, useState } from 'react'
import { CARD_HEIGHT, FLIP_DURATION_MS, PRISM_DEPTH, ROLL_INTERVAL_MS } from '../config/const'
import { DUMMY_NOTICES } from '../config/dummy'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'

type Props = {
  className?: string
}

const NoticeFace = ({ title }: { title: string }) => (
  <div className={'flex h-full items-center gap-2 px-3 group-hover:pr-16'}>
    <span
      className={'bg-brand text-brand-foreground shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide'}
    >
      공지
    </span>
    <Text className={'text-foreground! line-clamp-1 text-[13px] font-semibold md:text-[14px]'}>{title}</Text>
  </div>
)

/** TODO: 공지 전체 목록 연결 전 클릭 보류 */
const ViewAllOverlay = () => (
  <div
    className={
      'from-card via-card/95 pointer-events-none absolute inset-y-0 right-0 z-30 flex items-center bg-gradient-to-l to-transparent pl-6 opacity-0 transition-opacity duration-200 group-hover:pointer-events-auto group-hover:opacity-100'
    }
  >
    <button
      type={'button'}
      className={
        'text-subtle-foreground hover:text-foreground cursor-pointer px-3 text-[12px] font-medium whitespace-nowrap'
      }
    >
      전체보기
    </button>
  </div>
)

export const NoticeTicker = ({ className }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  const current = DUMMY_NOTICES[activeIndex]
  const next = DUMMY_NOTICES[(activeIndex + 1) % DUMMY_NOTICES.length]

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reduceMotion || isPaused || isFlipping || DUMMY_NOTICES.length <= 1) return

    const timer = window.setTimeout(() => {
      setIsFlipping(true)
    }, ROLL_INTERVAL_MS)

    return () => window.clearTimeout(timer)
  }, [activeIndex, isPaused, isFlipping, reduceMotion])

  useEffect(() => {
    if (!isFlipping) return

    const timer = window.setTimeout(() => {
      setActiveIndex(prev => (prev + 1) % DUMMY_NOTICES.length)
      setIsFlipping(false)
    }, FLIP_DURATION_MS)

    return () => window.clearTimeout(timer)
  }, [isFlipping])

  if (DUMMY_NOTICES.length === 0) return null

  if (reduceMotion) {
    return (
      <div className={cn('flex h-10 min-w-0 flex-1 items-center justify-center', className)} aria-label={'공지사항'}>
        <div
          className={'border-border bg-card group relative w-full max-w-md overflow-hidden rounded-[8px] border'}
          style={{ height: CARD_HEIGHT }}
        >
          <NoticeFace title={current.title} />
          <ViewAllOverlay />
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn('flex h-10 min-w-0 flex-1 items-center justify-center', className)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-live={'polite'}
      aria-label={'공지사항'}
    >
      <div
        className={'group relative w-full max-w-md'}
        style={{
          height: CARD_HEIGHT,
          perspective: '1100px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          className={'relative h-full w-full'}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipping ? 'rotateX(90deg)' : 'rotateX(0deg)',
            transition: isFlipping ? `transform ${FLIP_DURATION_MS}ms cubic-bezier(0.4, 0.0, 0.2, 1)` : 'none',
          }}
        >
          {/* 앞면 — 카드 면은 유지, 텍스트만 가림 */}
          <div
            className={'border-border bg-card absolute inset-0 overflow-hidden rounded-[8px] border'}
            style={{
              backfaceVisibility: 'hidden',
              transform: `rotateX(0deg) translateZ(${PRISM_DEPTH}px)`,
              boxShadow: '0 6px 14px -8px rgba(15,23,42,0.28)',
            }}
          >
            <div
              style={{
                height: '100%',
                opacity: isFlipping ? 0 : 1,
                transition: isFlipping ? `opacity ${Math.round(FLIP_DURATION_MS * 0.4)}ms ease-out` : 'none',
              }}
            >
              <NoticeFace title={current.title} />
            </div>
          </div>

          {/* 윗면 — 두께감 */}
          <div
            aria-hidden
            className={'bg-muted absolute inset-x-0 top-0 rounded-[8px]'}
            style={{
              height: PRISM_DEPTH * 2,
              backfaceVisibility: 'hidden',
              transform: `rotateX(90deg) translateZ(${PRISM_DEPTH}px)`,
              transformOrigin: 'center top',
            }}
          />

          {/* 아랫면 → 앞으로 올라옴 */}
          <div
            className={'border-border bg-card absolute inset-0 overflow-hidden rounded-[8px] border'}
            style={{
              backfaceVisibility: 'hidden',
              transform: `rotateX(-90deg) translateZ(${PRISM_DEPTH}px)`,
              boxShadow: '0 6px 14px -8px rgba(15,23,42,0.28)',
            }}
          >
            <NoticeFace title={next.title} />
          </div>
        </div>

        {/* 회전 레이어 밖 — 호버 시에만 표시 */}
        <ViewAllOverlay />
      </div>
    </div>
  )
}
