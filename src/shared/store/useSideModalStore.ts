import { create } from 'zustand/react'
import type { ComponentType } from 'react'

interface SideModal {
  isSideOpen: boolean
  sideTitle: string
  selectedContent: ComponentType | null
}

interface SideModalProps extends SideModal {
  openSideModal: (content: ComponentType, title: string) => void
  closeSideModal: () => void
}

export const useSideModalStore = create<SideModalProps>(set => ({
  isSideOpen: false,
  sideTitle: '',
  selectedContent: null,

  openSideModal: (content: ComponentType, title: string) => {
    set({
      isSideOpen: true,
      sideTitle: title,
      selectedContent: content,
    })
  },
  closeSideModal: () => set({ isSideOpen: false, sideTitle: '', selectedContent: null }),
}))
