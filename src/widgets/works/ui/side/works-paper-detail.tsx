import { CalendarDays, MapPin, Newspaper, UsersRound } from 'lucide-react'
import { WORKS_DETAIL_TAB } from '../../config/works-tab'
import { WorksMyProgress } from '@/entities/works'
import { Tab } from '@/shared/ui/override/tab'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'

export const WorkPaperDetail = () => {
  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 lg:w-[750px]'}>
      <section className={'flex flex-col gap-5 px-5 pb-2.5 lg:px-7.5'}>
        <div className={'flex flex-col gap-2.5'}>
          <div className={'flex items-center gap-2.5'}>
            <CalendarDays strokeWidth={2} className={'size-5'} />
            <div className={'flex items-center gap-1.25'}>
              <Text className={'text-[10px] font-medium md:text-[14px]'}>26.02.04(수) ~ 26.02.06(금)</Text>
              <div className={'rounded-[8px] bg-gray-100 px-2.5 py-1.25 text-[10px] font-bold md:text-[12px]'}>
                제출마감 D-5
              </div>
            </div>
          </div>
          <div className={'flex items-center gap-2.5'}>
            <Newspaper strokeWidth={2} className={'size-5'} />
            <Text className={'text-[10px] font-medium md:text-[14px]'}>2025 한국통신학회 동계종합학술발표회</Text>
          </div>

          <div className={'flex items-center gap-2.5'}>
            <MapPin strokeWidth={2} className={'size-5'} />
            <Text className={'text-[10px] font-medium md:text-[14px]'}>모나 용평(용평리조트)</Text>
          </div>
          <div className={'flex items-center gap-2.5'}>
            <UsersRound strokeWidth={2} className={'size-5'} />
            <div className={'flex flex-wrap gap-2.5'}>
              <Tag.Member name={'홍길동'} />
              <Tag.Member name={'홍길동'} />
              <Tag.Member name={'홍길동'} />
              <Tag.Member name={'홍길동'} />
            </div>
          </div>
        </div>
        <WorksMyProgress />
      </section>
      <section className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 px-5 pb-5 lg:w-[750px] lg:px-7.5'}>
        <Tab tabs={WORKS_DETAIL_TAB} />
      </section>
    </div>
  )
}
