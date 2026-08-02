import type { CalendarEvent } from '../model/types'

export const WEEK_LABEL = ['일', '월', '화', '수', '목', '금', '토'] as const

const pad = (value: number) => String(value).padStart(2, '0')

/** Date -> 'YYYY-MM-DD' */
export const toDateKey = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

/** 'YYYY-MM-DD' -> Date (타임존 영향을 받지 않도록 로컬 기준으로 생성) */
export const parseDateKey = (dateKey: string) => {
  const [year, month, day] = dateKey.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/** 'YYYY-MM-DD' -> '2025.12.11(목)' */
export const formatDateLabel = (dateKey: string) => {
  const date = parseDateKey(dateKey)
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}(${WEEK_LABEL[date.getDay()]})`
}

/** 일정 기간 라벨. 종료일이 있으면 '시작~종료' */
export const formatEventPeriod = ({ startDate, endDate }: Pick<CalendarEvent, 'startDate' | 'endDate'>) => {
  if (!endDate || endDate === startDate) return formatDateLabel(startDate)
  return `${formatDateLabel(startDate)}~${formatDateLabel(endDate)}`
}

/** 'Dec 2025' 형태의 월 타이틀 */
export const formatMonthTitle = (date: Date) =>
  date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).replace(',', '')

/**
 * 월간 그리드에 뿌릴 셀 목록.
 * 이전/다음 달 자리는 디자인상 빈 칸이므로 null 로 채운다.
 */
export const getMonthCells = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay()
  const lastDate = new Date(year, month + 1, 0).getDate()

  const cells: (Date | null)[] = Array.from({ length: firstDay }, () => null)
  for (let date = 1; date <= lastDate; date++) {
    cells.push(new Date(year, month, date))
  }
  while (cells.length % 7 !== 0) cells.push(null)

  return cells
}

/** 해당 날짜가 일정 기간에 포함되는지 */
export const isDateInEvent = (date: Date, { startDate, endDate }: CalendarEvent) => {
  const dateKey = toDateKey(date)
  return dateKey >= startDate && dateKey <= (endDate ?? startDate)
}

export const isSameDate = (a: Date, b: Date) => toDateKey(a) === toDateKey(b)
