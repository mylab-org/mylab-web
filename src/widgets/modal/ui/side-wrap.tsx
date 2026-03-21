'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/dist/client/components/navigation'
import { useLockBodyScroll } from '@/shared/model'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { SideModalHeader } from '@/widgets/header'

export const SideWrap = () => {
  const isSideOpen = useSideModalStore(state => state.isSideOpen)
  const closeSideModal = useSideModalStore(state => state.closeSideModal)
  const Content = useSideModalStore(state => state.selectedContent)
  useLockBodyScroll(isSideOpen)

  const handleCloseSideModal = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) closeSideModal()
  }

  const pathname = usePathname()
  console.log('pathname', pathname)

  return (
    <AnimatePresence>
      {isSideOpen && (
        <motion.section
          onClick={handleCloseSideModal}
          className={'fixed inset-0 z-50 flex h-dvh w-full justify-end bg-black/10'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={`relative flex w-full flex-col bg-white shadow-lg lg:rounded-l-[20px] ${pathname === '/more' ? 'lg:w-[550px]' : 'lg:w-[750px]'}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1], // iOS 느낌
            }}
          >
            <SideModalHeader />
            {Content && <Content />}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
