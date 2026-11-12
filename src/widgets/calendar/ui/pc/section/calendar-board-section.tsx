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
    // 행 높이를 월 그리드가 정하도록 두고, 일정 목록은 absolute 로 그 높이를 채운다.
    // (목록이 길어져도 행이 늘어나지 않아 월 그리드 아래에 빈 여백이 생기지 않는다)
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
