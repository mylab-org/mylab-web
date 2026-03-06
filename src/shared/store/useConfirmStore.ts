import { create } from 'zustand'

type ConfirmProps = {
  isConfirm: boolean
  msg: string
  onOpenConfirm: (text: string, onCloseCallback?: () => void) => void
  onTrue: () => void
  onFalse: () => void
  _onTrueCallback?: () => void
}

export const useConfirmStore = create<ConfirmProps>()(set => ({
  isConfirm: false,
  msg: '',
  _onTrueCallback: undefined,
  onOpenConfirm: (text, onCloseCallback) => set({ isConfirm: true, msg: text, _onTrueCallback: onCloseCallback }),
  onTrue: () =>
    set(state => {
      state._onTrueCallback?.()
      return { isConfirm: false, msg: '', _onTrueCallback: undefined }
    }),
  onFalse: () => set(state => ({ ...state, isConfirm: false, msg: '', _onTrueCallback: undefined })),
}))
