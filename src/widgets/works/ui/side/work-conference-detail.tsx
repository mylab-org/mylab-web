import { Image } from 'next/dist/client/image-component'
import { WorkSideCardList } from '../side-tab-content/work-side-card-list'
import { WorkSideChat } from '../side-tab-content/work-side-chat'
import { Tab } from '@/shared/ui/override/tab'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'

export const WorkConferenceDetail = () => {
  const tabs = [
    {
      name: '업무 진척도',
      content: <WorkSideCardList />,
    },
    {
      name: '업무 소통란',
      content: <WorkSideChat />,
    },
  ]

  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 lg:w-[750px]'}>
      <section className={'flex flex-col gap-2.5 px-5 pb-2.5 lg:px-7.5'}>
        <div className={'flex items-center gap-2.5'}>
          <Image src={'icon/icon_work_date.svg'} alt={''} width={20} height={20} />
          <div className={'flex items-center gap-1.25'}>
            <Text className={'text-[12px] font-medium md:text-[16px]'}>26.02.04(수) ~ 26.02.06(금)</Text>
            <div className={'rounded-[8px] bg-gray-100 px-2.5 py-1.25 text-[10px] font-bold md:text-[12px]'}>
              제출마감 D-5
            </div>
          </div>
        </div>
        <div className={'flex items-center gap-2.5'}>
          <Image src={'icon/icon_work_location.svg'} alt={''} width={20} height={20} />
          <Text className={'text-[12px] font-medium md:text-[16px]'}>모나 용평(용평리조트)</Text>
        </div>
        <div className={'flex items-center gap-2.5'}>
          <Image src={'icon/icon_work_member.svg'} alt={''} width={20} height={20} />
          <div className={'flex flex-wrap gap-2.5'}>
            <Tag.Member name={'홍길동'} />
            <Tag.Member name={'홍길동'} />
            <Tag.Member name={'홍길동'} />
            <Tag.Member name={'홍길동'} />
          </div>
        </div>
      </section>
      <section className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 px-5 pb-5 lg:w-[750px] lg:px-7.5'}>
        <Tab tabs={tabs} />
      </section>
    </div>
  )
}
