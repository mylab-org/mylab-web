import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'
import { WorkListItem } from '@/entities/works'
import { Avatar } from '@/shared/ui/override/avatar'
import { Text } from '@/shared/ui/override/text'

export const PersonalWorkWrap = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <section className={'flex flex-col gap-2.5 p-2.5'}>
      <div className={'flex min-w-0 flex-col items-center gap-2.5 overflow-x-auto border-b border-gray-200 py-2.5'}>
        <div
          className={'flex w-full cursor-pointer items-center justify-between'}
          onClick={() => setIsOpen(prev => !prev)}
        >
          <Avatar src={'/test.png'} alt={'profile'} width={24} height={24} imgClassName={'rounded-full'}>
            <Text className={'text-[16px] font-semibold md:text-[20px]'}>김철수</Text>
          </Avatar>
          <Image src={'icon/icon_common_drop.svg'} alt={''} width={16} height={16} />
        </div>
        {isOpen && (
          <div className={'flex w-full min-w-0 flex-1 flex-col items-center gap-2.5 md:flex-row md:overflow-x-auto'}>
            <WorkListItem type={'MEET'} />
            <WorkListItem type={'PERSONAL'} />
            <WorkListItem />
            <WorkListItem />
          </div>
        )}
      </div>
    </section>
  )
}
