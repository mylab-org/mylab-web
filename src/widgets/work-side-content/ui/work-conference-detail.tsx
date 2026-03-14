import { Image } from 'next/dist/client/image-component'
import { WorkSideCardList, WorkSideChat } from '@/entities/work-side'
import { Tag } from '@/shared/ui/tag'
import { Text } from '@/shared/ui/text'
import { Tab } from '@/widgets/tab'

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
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-[10px] lg:w-[750px]'}>
      <section className={'flex flex-col gap-[10px] px-[20px] pb-[10px] lg:px-[30px]'}>
        <div className={'flex items-center gap-[10px]'}>
          <Image src={'icon/icon_work_date.svg'} alt={''} width={20} height={20} />
          <div className={'flex items-center gap-[5px]'}>
            <Text className={'text-[12px] font-medium md:text-[16px]'}>26.02.04(수) ~ 26.02.06(금)</Text>
            <div className={'rounded-[8px] bg-gray-100 px-[10px] py-[5px] text-[10px] font-bold md:text-[12px]'}>
              제출마감 D-5
            </div>
          </div>
        </div>
        <div className={'flex items-center gap-[10px]'}>
          <Image src={'icon/icon_work_location.svg'} alt={''} width={20} height={20} />
          <Text className={'text-[12px] font-medium md:text-[16px]'}>모나 용평(용평리조트)</Text>
        </div>
        <div className={'flex items-center gap-[10px]'}>
          <Image src={'icon/icon_work_member.svg'} alt={''} width={20} height={20} />
          <div className={'flex flex-wrap gap-[10px]'}>
            <Tag.Member name={'홍길동'} />
            <Tag.Member name={'홍길동'} />
            <Tag.Member name={'홍길동'} />
            <Tag.Member name={'홍길동'} />
          </div>
        </div>
      </section>
      <section className={'flex min-h-0 w-full flex-1 flex-col gap-[10px] px-[20px] pb-5 lg:w-[750px] lg:px-[30px]'}>
        <Tab tabs={tabs} />
      </section>
    </div>
  )
}
