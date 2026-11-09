'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { postCalendarSchedule } from '../api/post-calendar-schedule'
import type { CalendarRecurrenceType, CalendarType } from '@/entities/calendar'
import { useUsersMeHook } from '@/entities/user'
import { useApiMutation } from '@/shared/model/use-api-mutation'

/** 화면에 보여줄 반복 옵션 → 서버 enum */
export const REPEAT_OPTIONS: { label: string; value: Exclude<CalendarRecurrenceType, 'NONE'> }[] = [
  { label: '매일', value: 'DAILY' },
  { label: '매주', value: 'WEEKLY' },
  { label: '매월', value: 'MONTHLY' },
]

type CalendarRegisterFormValues = {
  title: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  location: string
}

const DEFAULT_VALUES: CalendarRegisterFormValues = {
  title: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  location: '',
}

/** 'YYYY-MM-DD' + 'HH:mm' → ISO 문자열. 시간이 없으면 자정으로 본다 */
const toIsoString = (date: string, time?: string) => new Date(`${date}T${time || '00:00'}`).toISOString()

export const useCalendarRegisterFormHook = (type: CalendarType, onSuccess?: () => void) => {
  const { lab } = useUsersMeHook()
  const labId = lab?.labId

  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([])
  const [repeat, setRepeat] = useState<CalendarRecurrenceType | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<CalendarRegisterFormValues>({ defaultValues: DEFAULT_VALUES, mode: 'onChange' })

  const postCalendarScheduleMutation = useApiMutation({
    mutationFn: (payload: Parameters<typeof postCalendarSchedule>[1]) => postCalendarSchedule(labId as number, payload),
    successMessage: '일정이 등록되었습니다.',
    defaultErrorMessage: '일정 등록에 실패했습니다.',
    // 월이 바뀌어도 반영되도록 캘린더 쿼리 전체를 무효화한다
    invalidateQueryKeys: [['calendar']],
    onSuccess: () => {
      reset(DEFAULT_VALUES)
      setSelectedMemberIds([])
      setRepeat(null)
      onSuccess?.()
    },
  })

  const onSubmit = handleSubmit(values => {
    if (labId === undefined) return

    // 회식은 종료일을 쓰지 않고, 학회는 시간 없이 날짜만 받는다
    const hasEnd = type !== 'LAB_DINNER' && Boolean(values.endDate)

    postCalendarScheduleMutation.mutate({
      schedule_type: type,
      title: values.title,
      start_at: toIsoString(values.startDate, values.startTime),
      ...(hasEnd ? { end_at: toIsoString(values.endDate, values.endTime) } : {}),
      location: values.location,
      participant_ids: selectedMemberIds,
      ...(type === 'MEETING' && repeat ? { recurrence_type: repeat } : {}),
    })
  })

  return {
    register,
    onSubmit,
    selectedMemberIds,
    setSelectedMemberIds,
    repeat,
    setRepeat,
    isValid,
    isPending: postCalendarScheduleMutation.isPending,
  }
}

export type { CalendarRegisterFormValues }
