'use client'

import { Pin } from 'lucide-react'
import { useState } from 'react'
import { Text } from '@/shared/ui/override/text'

type BoardNotice = {
  id: number
  title: string
  dateLabel: string
}

/** TODO: API 연동 전 임시 더미 — 기존 사이드 공지 대체 */
const DUMMY_NOTICES: BoardNotice[] = [
  { id: 1, title: '비품 확인해주세요', dateLabel: '26.01.31 (토) 19:30' },
  { id: 2, title: '연구실 세미나 일정 안내', dateLabel: '26.01.28 (수) 14:00' },
  { id: 3, title: '다음 주 랩미팅 장소 변경', dateLabel: '26.01.25 (일) 10:00' },
]

const PREVIEW_COUNT = 2

export const BoardNoticeBanner = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (DUMMY_NOTICES.length === 0) return null

  const visibleNotices = isExpanded ? DUMMY_NOTICES : DUMMY_NOTICES.slice(0, PREVIEW_COUNT)
  const hiddenCount = DUMMY_NOTICES.length - PREVIEW_COUNT

  return (
    <div className={'flex flex-col gap-2 rounded-[12px] border border-[#2562CD]/20 bg-[#2562CD]/5 px-3.5 py-3 md:px-4'}>
      <div className={'flex items-center gap-1.5'}>
        <Pin className={'h-3.5 w-3.5 text-[#2562CD]'} aria-hidden />
        <Text className={'text-[12px] font-semibold text-[#2562CD]! md:text-[13px]'}>공지사항</Text>
      </div>

      <ul className={'flex flex-col gap-2'}>
        {visibleNotices.map(notice => (
          <li key={notice.id}>
            <button
              type={'button'}
              className={'flex w-full flex-col gap-0.5 rounded-[8px] px-1 py-1 text-left hover:bg-white/60'}
            >
              <Text className={'line-clamp-1 text-[14px] font-bold md:text-[15px]'}>{notice.title}</Text>
              <Text className={'text-[12px] font-medium text-gray-400!'}>{notice.dateLabel}</Text>
            </button>
          </li>
        ))}
      </ul>

      {hiddenCount > 0 && (
        <button type={'button'} className={'self-start px-1'} onClick={() => setIsExpanded(prev => !prev)}>
          <Text className={'text-[12px] font-medium text-[#2562CD]!'}>
            {isExpanded ? '접기' : `공지 ${hiddenCount}개 더보기`}
          </Text>
        </button>
      )}
    </div>
  )
}
