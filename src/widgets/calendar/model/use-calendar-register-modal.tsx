'use client'

import { CalendarRegisterContent } from '../ui/side/calendar-register-content'
import type { CalendarType } from '@/entities/calendar'
import type { LabsMembersResponseType } from '@/entities/labs/model/types'
import { CALENDAR_TYPE } from '@/shared/constant/tag'
import { useSideModalStore } from '@/shared/store'

/** 일정 등록 사이드 모달. PC·모바일이 같은 화면을 쓴다 */
export const useCalendarRegisterModal = (members: LabsMembersResponseType[]) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const closeSideModal = useSideModalStore(state => state.closeSideModal)

  const openRegisterModal = (type: CalendarType) => {
    // 사이드 모달은 props 없는 컴포넌트를 받으므로 한 번 감싸서 넘긴다
    const Content = () => <CalendarRegisterContent members={members} initialType={type} onRegistered={closeSideModal} />

    openSideModal(Content, `${CALENDAR_TYPE[type].NAME} 등록하기`)
  }

  return { openRegisterModal }
}
