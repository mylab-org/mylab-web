import { P } from '@/shared/ui'

export const CalendarWeek = () => {
  const getWeekDates = (baseDate: Date) => {
    const day = baseDate.getDay() // 0(일) ~ 6(토)
    const sunday = new Date(baseDate)
    sunday.setDate(baseDate.getDate() - day)

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(sunday)
      date.setDate(sunday.getDate() + i)
      return date
    })
  }

  const today = new Date('2029-01-01')
  const weekDates = getWeekDates(today)

  const isToday = (date: Date) => date.toDateString() === today.toDateString()

  return (
    <div>
      <div className={'grid grid-cols-7 text-center'}>
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <P key={day} className="text-[14px] font-medium text-[#6B7280]!">
            {day}
          </P>
        ))}
      </div>
      {/* 날짜 */}
      <div className="grid grid-cols-7 text-center">
        {weekDates.map(date => (
          <div key={date.toISOString()} className="flex justify-center">
            <P
              className={`flex h-[30px] w-[30px] items-center justify-center rounded-full text-[18px] font-medium ${
                isToday(date) ? 'bg-dark text-white' : 'text-gray-900'
              } `}
            >
              {date.getDate()}
            </P>
          </div>
        ))}
      </div>
    </div>
  )
}
