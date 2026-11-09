'use client'

import { MemberSelect } from './member-select'
import { REPEAT_OPTIONS, useCalendarRegisterFormHook } from '../model/use-calendar-register-form-hook'
import type { CalendarType } from '@/entities/calendar'
import type { LabsMembersResponseType } from '@/entities/labs/model/types'
import { CALENDAR_TYPE } from '@/shared/constant/tag'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'
import { FloatingLabel } from '@/shared/ui/template/floating-label'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface ScheduleRegisterFormProps {
  type: CalendarType
  /** 참가인원으로 선택할 수 있는 연구실 구성원 */
  members: LabsMembersResponseType[]
  /** 등록 성공 후 처리 (모바일 사이드 모달 닫기 등) */
  onRegistered?: () => void
}

/** 종류별 날짜 입력 구성 */
const DATE_FIELD: Record<CalendarType, { isRange: boolean; withTime: boolean }> = {
  CONFERENCE: { isRange: true, withTime: false },
  MEETING: { isRange: true, withTime: true },
  LAB_DINNER: { isRange: false, withTime: true },
}

const UnderlineField = ({
  label,
  id,
  type,
  className,
  registration,
}: {
  label: string
  id: string
  type: 'date' | 'time'
  className?: string
  registration: UseFormRegisterReturn
}) => (
  <div className={cn('border-b-border flex flex-1 items-center gap-2.5 border-b-2 py-2.5', className)}>
    <label htmlFor={id} className={'text-subtle-foreground shrink-0 text-[14px] font-medium'}>
      {label}
    </label>
    <input
      id={id}
      type={type}
      className={'text-foreground w-full text-[14px] font-medium outline-0'}
      autoComplete={'off'}
      {...registration}
    />
  </div>
)

export const ScheduleRegisterForm = ({ type, members, onRegistered }: ScheduleRegisterFormProps) => {
  const { register, onSubmit, selectedMemberIds, setSelectedMemberIds, repeat, setRepeat, isPending } =
    useCalendarRegisterFormHook(type, onRegistered)

  const { NAME } = CALENDAR_TYPE[type]
  const { isRange, withTime } = DATE_FIELD[type]

  // lg:min-h - 종류를 바꿔도 카드 높이가 흔들리지 않도록 가장 큰 폼(미팅) 기준으로 최소 높이를 잡는다
  return (
    <form className={'flex flex-col gap-7.5 lg:min-h-[360px] lg:flex-row'} onSubmit={onSubmit}>
      <div className={'flex flex-1 flex-col gap-7.5'}>
        {type === 'CONFERENCE' && (
          <div className={'flex justify-end'}>
            {/* TODO: 학회 검색 시트 연결 */}
            <Button.Menu isGray className={'text-[12px]!'}>
              검색해서 학회 찾기
            </Button.Menu>
          </div>
        )}

        <FloatingLabel labelName={`${NAME} 이름`} className={'w-full'} {...register('title', { required: true })} />

        <div className={'flex items-center gap-7.5'}>
          <UnderlineField
            label={isRange ? '시작일' : '날짜'}
            id={'startDate'}
            type={'date'}
            registration={register('startDate', { required: true })}
          />
          {withTime && (
            <UnderlineField label={'시간'} id={'startTime'} type={'time'} registration={register('startTime')} />
          )}
        </div>

        {isRange && (
          <div className={'flex items-center gap-7.5'}>
            <UnderlineField label={'종료일'} id={'endDate'} type={'date'} registration={register('endDate')} />
            {withTime && (
              <UnderlineField label={'시간'} id={'endTime'} type={'time'} registration={register('endTime')} />
            )}
          </div>
        )}

        <FloatingLabel labelName={'장소'} className={'w-full'} {...register('location')} />

        {type === 'MEETING' && (
          <div className={'flex flex-col gap-2.5'}>
            <Text className={'text-[14px] font-bold'}>반복</Text>
            <div className={'flex flex-wrap gap-1.75'}>
              {REPEAT_OPTIONS.map(({ label, value }) => (
                <button
                  key={value}
                  type={'button'}
                  aria-pressed={repeat === value}
                  className={cn(
                    'cursor-pointer rounded-[20px] px-3 py-1 text-[12px] font-medium transition-colors',
                    repeat === value ? 'bg-brand text-brand-foreground' : 'text-muted-foreground hover:bg-muted',
                  )}
                  onClick={() => setRepeat(repeat === value ? null : value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={'flex w-full flex-col justify-between gap-7.5 lg:w-[210px]'}>
        <MemberSelect members={members} selected={selectedMemberIds} onChange={setSelectedMemberIds} />
        <Button type={'submit'} className={'w-full'} disabled={isPending}>
          {isPending ? '등록 중...' : '등록하기'}
        </Button>
      </div>
    </form>
  )
}
