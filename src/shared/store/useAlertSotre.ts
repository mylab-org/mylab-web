'use client'

import { create } from 'zustand'
import { ALERT_CONFIRM_TYPE, type AlertConfirmType } from '@/shared/constant/alert'

type OpenAlertParams = {
  message: string
  confirmType?: AlertConfirmType
}

type AlertState = {
  isAlert: boolean
  msg: string
  confirmType: AlertConfirmType
  onOpenAlert: (params: OpenAlertParams) => void
  onCloseAlert: () => void
}

export const useAlertStore = create<AlertState>()(set => ({
  isAlert: false,
  msg: '',
  confirmType: ALERT_CONFIRM_TYPE.CLOSE,
  onOpenAlert: ({ message, confirmType = ALERT_CONFIRM_TYPE.CLOSE }) =>
    set({
      isAlert: true,
      msg: message,
      confirmType,
    }),
  onCloseAlert: () =>
    set({
      isAlert: false,
      msg: '',
      confirmType: ALERT_CONFIRM_TYPE.CLOSE,
    }),
}))
