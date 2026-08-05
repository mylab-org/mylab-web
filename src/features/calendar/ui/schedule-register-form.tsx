'use client'

import { useState } from 'react'
import { MemberSelect } from './member-select'
import type { CalendarType } from '@/entities/calendar'
import { CALENDAR_TYPE } from '@/shared/constant/tag'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui/button'
import { FloatingLabel } from '@/shared/ui/floating-label'
import { Text } from '@/shared/ui/text'

interface ScheduleRegisterFormProps {
  type: CalendarType
  /** 참가인원으로 선택할 수 있는 연구실 구성원 */
  members: string[]
}

const REPEAT_OPTIONS = ['매일', '매주', '매월', '매년'] as const

type RepeatOption = (typeof REPEAT_OPTIONS)[number]

/** 종류별 날짜 입력 구성 */
const DATE_FIELD: Record<CalendarType, { isRange: boolean; withTime: boolean }> = {
  CONFERENCE: { isRange: true, withTime: false },
  MEETING: { isRange: true, withTime: true },
  DINNER: { isRange: false, withTime: true },
}

const UnderlineField = ({
  label,
  name,
  type,
  className,
}: {
  label: string
  name: string
  type: 'date' | 'time'
  className?: string
}) => (
  <div className={cn('flex flex-1 items-center gap-2.5 border-b-2 border-b-gray-300 py-2.5', className)}>
    <label htmlFor={name} className={'shrink-0 text-[14px] font-medium text-gray-400'}>
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      className={'w-full text-[14px] font-medium text-gray-900 outline-0'}
      autoComplete={'off'}
    />
  </div>
)

export const ScheduleRegisterForm = ({ type, members }: ScheduleRegisterFormProps) => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [repeat, setRepeat] = useState<RepeatOption | null>(null)

  const { NAME } = CALENDAR_TYPE[type]
  const { isRange, withTime } = DATE_FIELD[type]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: 일정 등록 API 연동
  }

  // lg:min-h - 종류를 바꿔도 카드 높이가 흔들리지 않도록 가장 큰 폼(미팅) 기준으로 최소 높이를 잡는다
  return (
    <form className={'flex flex-col gap-7.5 lg:min-h-[360px] lg:flex-row'} onSubmit={handleSubmit}>
      <div className={'flex flex-1 flex-col gap-7.5'}>
        {type === 'CONFERENCE' && (
          <div className={'flex justify-end'}>
            {/* TODO: 학회 검색 시트 연결 */}
            <Button.Menu isGray className={'text-[12px]!'}>
              검색해서 학회 찾기
            </Button.Menu>
          </div>
        )}

        <FloatingLabel labelName={`${NAME} 이름`} name={'title'} className={'w-full'} />

        <div className={'flex items-center gap-7.5'}>
          <UnderlineField label={isRange ? '시작일' : '날짜'} name={'startDate'} type={'date'} />
          {withTime && <UnderlineField label={'시간'} name={'startTime'} type={'time'} />}
        </div>

        {isRange && (
          <div className={'flex items-center gap-7.5'}>
            <UnderlineField label={'종료일'} name={'endDate'} type={'date'} />
            {withTime && <UnderlineField label={'시간'} name={'endTime'} type={'time'} />}
          </div>
        )}

        <FloatingLabel labelName={'장소'} name={'place'} className={'w-full'} />

        {type === 'MEETING' && (
          <div className={'flex flex-col gap-2.5'}>
            <Text className={'text-[14px] font-bold'}>반복</Text>
            <div className={'flex flex-wrap gap-1.75'}>
              {REPEAT_OPTIONS.map(option => (
                <button
                  key={option}
                  type={'button'}
                  aria-pressed={repeat === option}
                  className={cn(
                    'cursor-pointer rounded-[20px] px-3 py-1 text-[12px] font-medium transition-colors',
                    repeat === option ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-100',
                  )}
                  onClick={() => setRepeat(prev => (prev === option ? null : option))}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={'flex w-full flex-col justify-between gap-7.5 lg:w-[210px]'}>
        <MemberSelect members={members} selected={selectedMembers} onChange={setSelectedMembers} />
        <Button type={'submit'} className={'w-full'}>
          등록하기
        </Button>
      </div>
    </form>
  )
}
