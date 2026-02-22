import clsx from 'clsx'
import { Image } from 'next/dist/client/image-component'
import { AlarmListItem } from '@/widgets/alram/ui/alarm-list-item'

interface AlarmWrapperProps {
  isOpen: boolean
  onClose: () => void
}

export const AlarmWrapper = ({ isOpen, onClose }: AlarmWrapperProps) => {
  return (
    <section
      className={clsx(
        'absolute top-0 right-0 z-[10] flex min-h-dvh w-full flex-col gap-[14px] bg-white p-[24px] shadow-md transition-all duration-200 ease-out md:top-10 md:h-[600px] md:w-[400px] md:rounded-[24px]',
        isOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0',
      )}
    >
      <div className={'flex items-center justify-between'}>
        <h3 className={'font-pretendard text-[24px] leading-[32px] font-bold'}>알림</h3>
        <Image
          src={'icon/x.svg'}
          alt={''}
          width={36}
          height={36}
          className={'block shrink-0 md:hidden'}
          onClick={onClose}
        />
      </div>
      <ul className={'flex flex-col gap-[10px] overflow-auto px-[10px]'}>
        <AlarmListItem type={'미팅 알림'} dateAt={'방금'} title={'이번주 미팅이 사라졌어요!'} />
      </ul>
    </section>
  )
}
