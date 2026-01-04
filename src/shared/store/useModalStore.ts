import { create } from 'zustand/react'

interface Modal {
  isStuModal: boolean
}

interface ModalProps extends Modal {
  setModal: (key: keyof Modal, state: boolean) => void
}

export const useModalStore = create<ModalProps>(set => ({
  isStuModal: false,
  setModal: (key: keyof Modal, state: boolean) => {
    set(prev => ({
      ...prev,
      [key]: state,
    }))
  },
}))
