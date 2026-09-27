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
