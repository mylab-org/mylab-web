const padTwo = (value: number) => String(value).padStart(2, '0')

const toValidDate = (value: Date | string | number) => {
  const date = value instanceof Date ? value : new Date(value)

  if (Number.isNaN(date.getTime())) {
    throw new Error('유효하지 않은 날짜입니다.')
  }

  return date
}

/** yyyy-mm-dd */
export const formatDate = (value: Date | string | number) => {
  const date = toValidDate(value)

  return `${date.getFullYear()}-${padTwo(date.getMonth() + 1)}-${padTwo(date.getDate())}`
}

/** yyyy-mm-dd 오전/오후 hh:mm */
export const formatDateTime = (value: Date | string | number) => {
  const date = toValidDate(value)
  const hours24 = date.getHours()
  const period = hours24 < 12 ? '오전' : '오후'
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12

  return `${formatDate(date)} ${period} ${padTwo(hours12)}:${padTwo(date.getMinutes())}`
}

const MINUTE_MS = 60 * 1000
const HOUR_MS = 60 * MINUTE_MS
const DAY_MS = 24 * HOUR_MS

/** 현재 기준 — 방금 전 / n분 전 / n시간 전 / n일 전(2주 미만) / m월 d일(올해) / yyyy-mm-dd */
export const formatRelativeDate = (value: Date | string | number) => {
  const date = toValidDate(value)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  if (diff < MINUTE_MS) return '방금 전'
  if (diff < HOUR_MS) return `${Math.floor(diff / MINUTE_MS)}분 전`
  if (diff < DAY_MS) return `${Math.floor(diff / HOUR_MS)}시간 전`
  if (diff < 14 * DAY_MS) return `${Math.floor(diff / DAY_MS)}일 전`
  if (date.getFullYear() === now.getFullYear()) return `${date.getMonth() + 1}월 ${date.getDate()}일`

  return formatDate(date)
}
