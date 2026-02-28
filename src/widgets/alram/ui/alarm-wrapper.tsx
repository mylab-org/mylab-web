import { motion, AnimatePresence } from 'framer-motion'
import { Image } from 'next/dist/client/image-component'
import { useEffect, useRef } from 'react'
import { useLockBodyScroll } from '@/shared/hooks'
import { AlarmListItem } from '@/widgets/alram/ui/alarm-list-item'

interface AlarmWrapperProps {
  isOpen: boolean
  onClose: () => void
}

export const AlarmWrapper = ({ isOpen, onClose }: AlarmWrapperProps) => {
  useLockBodyScroll(isOpen)

  const modalRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (!modalRef.current) return

      if (!modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.section
          ref={modalRef}
          className={
            'fixed top-0 right-0 z-[10] flex h-dvh w-full flex-col gap-[14px] bg-white p-[24px] shadow-md md:top-20 md:right-5 md:h-[600px] md:w-[400px] md:rounded-[24px]'
          }
          key="alarm-modal"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className={'flex items-center justify-between'}>
            <h3 className={'font-pretendard text-[20px] leading-[32px] font-bold lg:text-[24px]'}>알림</h3>
            <Image
              src={'icon/x.svg'}
              alt={''}
              width={30}
              height={30}
              className={'block shrink-0 md:hidden'}
              onClick={onClose}
            />
          </div>
          <ul className={'flex flex-col gap-[10px] overflow-auto px-[10px]'}>
            <AlarmListItem type={'미팅 알림'} dateAt={'방금'} title={'이번주 미팅이 사라졌어요!'} />
            <AlarmListItem type={'미팅 알림'} dateAt={'방금'} title={'이번주 미팅이 사라졌어요!'} />
            <AlarmListItem type={'미팅 알림'} dateAt={'방금'} title={'이번주 미팅이 사라졌어요!'} />
          </ul>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
