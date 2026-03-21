'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Image } from 'next/dist/client/image-component'
import { useEffect } from 'react'
import { useLockBodyScroll } from '@/shared/model'
import { useSideModalStore } from '@/shared/store'

export const SideWrap = () => {
  const isSideOpen = useSideModalStore(state => state.isSideOpen)
  const closeSideModal = useSideModalStore(state => state.closeSideModal)
  const Content = useSideModalStore(state => state.selectedContent)
  const Title = useSideModalStore(state => state.sideTitle)

  useLockBodyScroll(isSideOpen)

  useEffect(() => {
    return () => closeSideModal()
  }, [])

  const handleCloseSideModal = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) closeSideModal()
  }

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
            className={`relative flex w-full flex-col bg-white shadow-lg lg:w-fit lg:rounded-l-[20px]`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1], // iOS 느낌
            }}
          >
            <div className={'flex items-center justify-between px-[20px] py-[20px] lg:px-[30px]'}>
              <h3 className={'text-[18px] leading-[32px] font-bold lg:text-[24px]'}>{Title}</h3>
              <Image
                src={'icon/x.svg'}
                alt={''}
                width={36}
                height={36}
                className={'block shrink-0 cursor-pointer'}
                onClick={closeSideModal}
              />
            </div>
            {Content && <Content />}
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
