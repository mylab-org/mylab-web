'use client'

import { CalendarScheduleListSection } from './calendar-schedule-list-section'
import { useCalendarBoardHook } from '../../../model/use-calendar-board-hook'
import { useCalendarRegisterModal } from '../../../model/use-calendar-register-modal'
import { CalendarMonthWrapper } from '../../month/calendar-month-wrapper'

export const CalendarBoardSection = () => {
  const {
    currentDate,
    setCurrentDate,
    filter,
    setFilter,
    selectedDate,
    setSelectedDate,
    handleSelectDate,
    filteredEvents,
    listEvents,
    members,
    isPending,
    moveMonth,
    isThisMonth,
    goToday,
  } = useCalendarBoardHook()

  const { openRegisterModal } = useCalendarRegisterModal(members)

  return (
    // 목록을 absolute 로 띄워 행 높이 계산에서 제외, 월 그리드 아래 빈 여백 방지
    <div className={'flex min-h-0 gap-4 focus:outline-none'}>
      <CalendarMonthWrapper
        currentDate={currentDate}
        onChangeDate={setCurrentDate}
        onMoveMonth={moveMonth}
        isThisMonth={isThisMonth}
        onGoToday={goToday}
        filter={filter}
        onChangeFilter={setFilter}
        events={filteredEvents}
        selectedDate={selectedDate}
        onSelectDate={handleSelectDate}
      />
      <div className={'relative w-[360px] shrink-0'}>
        <CalendarScheduleListSection
          className={'absolute inset-0'}
          events={listEvents}
          selectedDate={selectedDate}
          onClearSelectedDate={() => setSelectedDate(null)}
          onAddSchedule={() => openRegisterModal('CONFERENCE')}
          isPending={isPending}
        />
      </div>
    </div>
  )
}
