'use client'

import { CalendarRegisterContent } from '../ui/side/calendar-register-content'
import type { CalendarType } from '@/entities/calendar'
import type { LabsMembersResponseType } from '@/entities/labs/model/types'
import { CALENDAR_TYPE } from '@/shared/constant/tag'
import { useSideModalStore } from '@/shared/store'

export const useCalendarRegisterModal = (members: LabsMembersResponseType[]) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const closeSideModal = useSideModalStore(state => state.closeSideModal)

  const openRegisterModal = (type: CalendarType) => {
    const Content = () => <CalendarRegisterContent members={members} initialType={type} onRegistered={closeSideModal} />

    openSideModal(Content, `${CALENDAR_TYPE[type].NAME} 등록하기`)
  }

  return { openRegisterModal }
}
