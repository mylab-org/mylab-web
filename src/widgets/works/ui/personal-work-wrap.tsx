import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'
import { WorkListItem, WorkMyProgress } from '@/entities/works'
import { Tag, Text } from '@/shared/ui'

export const PersonalWorkWrap = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <section className={'flex flex-col gap-[10px] p-[10px]'}>
      <div
        className={'flex flex-col items-center gap-[10px] rounded-[12px] border border-gray-200 px-[20px] py-[10px]'}
      >
        <div
          className={'flex w-full cursor-pointer items-center justify-between'}
          onClick={() => setIsOpen(prev => !prev)}
        >
          <Text className={'text-[20px] font-semibold'}>김철수</Text>
          <Image src={'icon/icon_common_drop.svg'} alt={''} width={16} height={16} />
        </div>
        {isOpen && (
          <div className={'flex w-full items-center gap-[10px]'}>
            <div className={'flex w-[373px] flex-col gap-[10px]'}>
              <div className={'flex flex-col gap-[5px]'}>
                <Tag.WorkType type={'CONFERENCE'} />
                <WorkListItem />
              </div>
              <div className={'flex flex-col gap-[5px]'}>
                {/*<WorkProgress />*/}
                <WorkMyProgress type={'CONFERENCE'} />
              </div>
            </div>
            <div className={'flex w-[373px] flex-col gap-[10px]'}>
              <div className={'flex flex-col gap-[5px]'}>
                <Tag.WorkType type={'MEET'} />
                <WorkListItem />
              </div>
              <div className={'flex flex-col gap-[5px]'}>
                {/*<WorkProgress />*/}
                <WorkMyProgress type={'MEET'} />
              </div>
            </div>
            <div className={'flex w-[373px] flex-col gap-[10px]'}>
              <div className={'flex flex-col gap-[5px]'}>
                <Tag.WorkType type={'PERSONAL'} />
                <WorkListItem />
              </div>
              <div className={'flex flex-col gap-[5px]'}>
                {/*<WorkProgress />*/}
                <WorkMyProgress type={'PERSONAL'} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
