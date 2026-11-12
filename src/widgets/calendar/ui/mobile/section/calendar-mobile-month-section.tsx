'use client'

import { useCalendarBoardHook } from '../../../model/use-calendar-board-hook'
import { useCalendarRegisterModal } from '../../../model/use-calendar-register-modal'
import { CalendarAddMenu } from '../../menu/calendar-add-menu'
import { CalendarMonthWrapper } from '../../month/calendar-month-wrapper'
import { CalendarListItem, formatDateLabel, toDateKey } from '@/entities/calendar'
import { Text } from '@/shared/ui/override/text'

export const CalendarMobileMonthSection = () => {
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
    <section className={'flex flex-1 flex-col gap-4'}>
      <CalendarMonthWrapper
        variant={'mobile'}
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
        headerRight={<CalendarAddMenu onSelect={openRegisterModal} />}
      />

      <div className={'border-border flex flex-col gap-3 border-t px-4 pt-4'}>
        <div className={'flex items-center justify-between gap-2'}>
          <Text className={'text-[15px] font-bold'}>
            {selectedDate ? `${formatDateLabel(toDateKey(selectedDate))} 일정` : '이번 달 일정'}
            <span className={'text-subtle-foreground ml-1.5 text-[13px] font-semibold'}>{listEvents.length}</span>
          </Text>
          {selectedDate && (
            <button
              type={'button'}
              className={'text-brand cursor-pointer rounded-full px-2.5 py-1 text-[12px] font-semibold'}
              onClick={() => setSelectedDate(null)}
            >
              전체보기
            </button>
          )}
        </div>

        {isPending ? (
          <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>일정을 불러오는 중입니다</Text>
        ) : listEvents.length === 0 ? (
          <Text className={'text-subtle-foreground py-8 text-center text-[14px]'}>등록된 일정이 없습니다</Text>
        ) : (
          listEvents.map(event => <CalendarListItem key={event.key} event={event} />)
        )}
      </div>
    </section>
  )
}
