'use client'

import { CalendarScheduleListSection } from './calendar-schedule-list-section'
import { useCalendarBoardHook } from '../../../model/use-calendar-board-hook'
import { useCalendarRegisterModal } from '../../../model/use-calendar-register-modal'
import { CalendarMonthWrapper } from '../../month/calendar-month-wrapper'

/** 월 그리드와 일정 목록이 상태를 공유하므로 한 곳에서 묶어 렌더한다 */
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
    <div className={'flex min-h-0 flex-1 gap-4 focus:outline-none'}>
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
      <CalendarScheduleListSection
        events={listEvents}
        selectedDate={selectedDate}
        onClearSelectedDate={() => setSelectedDate(null)}
        onAddSchedule={() => openRegisterModal('CONFERENCE')}
        isPending={isPending}
      />
    </div>
  )
}
