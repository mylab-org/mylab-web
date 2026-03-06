import { create } from 'zustand'

type AlertProps = {
  isAlert: boolean
  msg: string
  onOpenAlert: (text: string, onCloseCallback?: () => void) => void
  onCloseAlert: () => void
  _onCloseCallback?: () => void
}

export const useAlertStore = create<AlertProps>()(set => ({
  isAlert: false,
  msg: '',
  _onCloseCallback: undefined,
  onOpenAlert: (text, onCloseCallback) => set({ isAlert: true, msg: text, _onCloseCallback: onCloseCallback }),
  onCloseAlert: () =>
    set(state => {
      state._onCloseCallback?.()
      return { isAlert: false, msg: '', _onCloseCallback: undefined }
    }),
}))
