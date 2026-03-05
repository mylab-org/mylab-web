import { create } from 'zustand/react'
import type { DialogType } from '@/shared/constant/dialog'

interface DialogModal {
  isOpen: boolean
  btnText: string
  item: DialogType
  callback?: () => void
}

interface DialogModalProps extends DialogModal {
  openDialogModal: (item: DialogType, btnText: string, callback: () => void) => void
  closeDialogModal: () => void
}

const initialState: DialogModal = {
  isOpen: false,
  btnText: '',
  item: {
    title: '',
    description: '',
    etc: '',
  },
  callback: () => {},
}

export const useDialogStore = create<DialogModalProps>(set => ({
  ...initialState,
  closeDialogModal: () => set({ ...initialState }),
  openDialogModal: (item, btnText, callback) => set({ isOpen: true, item, btnText, callback }),
}))
