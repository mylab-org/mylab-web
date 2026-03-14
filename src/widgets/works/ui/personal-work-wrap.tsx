import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'
import { WorkListItem, WorkMyProgress } from '@/entities/works'
import { Text } from '@/shared/ui'
import { Tag } from '@/shared/ui/tag'

export const PersonalWorkWrap = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <section className={'flex flex-col gap-[10px] p-[10px]'}>
      <div
        className={'flex min-w-0 flex-col items-center gap-[10px] overflow-x-auto border-b border-gray-200 py-[10px]'}
      >
        <div
          className={'flex w-full cursor-pointer items-center justify-between'}
          onClick={() => setIsOpen(prev => !prev)}
        >
          <Text className={'text-[16px] font-semibold md:text-[20px]'}>김철수</Text>
          <Image src={'icon/icon_common_drop.svg'} alt={''} width={16} height={16} />
        </div>
        {isOpen && (
          <div className={'flex w-full min-w-0 flex-1 flex-col items-center gap-[10px] md:flex-row md:overflow-x-auto'}>
            <div className={'flex w-full flex-col gap-[10px] md:w-[373px] md:flex-shrink-0'}>
              <div className={'flex flex-col gap-[5px]'}>
                <Tag.WorkType type={'CONFERENCE'} />
                <WorkListItem />
              </div>
              <div className={'flex flex-col gap-[5px]'}>
                <WorkMyProgress type={'CONFERENCE'} />
              </div>
            </div>
            <div className={'flex w-full flex-col gap-[10px] md:w-[373px] md:flex-shrink-0'}>
              <div className={'flex flex-col gap-[5px]'}>
                <Tag.WorkType type={'MEET'} />
                <WorkListItem />
              </div>
              <div className={'flex flex-col gap-[5px]'}>
                <WorkMyProgress type={'MEET'} />
              </div>
            </div>
            <div className={'flex w-full flex-col gap-[10px] md:w-[373px] md:flex-shrink-0'}>
              <div className={'flex flex-col gap-[5px]'}>
                <Tag.WorkType type={'PERSONAL'} />
                <WorkListItem />
              </div>
              <div className={'flex flex-col gap-[5px]'}>
                <WorkMyProgress type={'PERSONAL'} />
              </div>
            </div>
            <div className={'flex w-full flex-col gap-[10px] md:w-[373px] md:flex-shrink-0'}>
              <div className={'flex flex-col gap-[5px]'}>
                <Tag.WorkType type={'PERSONAL'} />
                <WorkListItem />
              </div>
              <div className={'flex flex-col gap-[5px]'}>
                <WorkMyProgress type={'PERSONAL'} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
