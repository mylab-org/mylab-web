import { create } from 'zustand/react'

interface SideModal {
  isSideOpen: boolean
}

interface SideModalProps extends SideModal {
  setIsSideOpen: (isOpen: boolean) => void
}

export const useSideModalStore = create<SideModalProps>(set => ({
  isSideOpen: false,
  setIsSideOpen: (isOpen: boolean) => {
    set(prev => ({
      ...prev,
      isSideOpen: isOpen,
    }))
  },
}))
