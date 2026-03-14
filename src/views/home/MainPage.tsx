'use client'

import { CalendarListItem, CalendarWeek } from '@/entities/calendar'
import { LabIntro } from '@/entities/lab/ui/lab-intro'
import { LabUserInfo } from '@/entities/user'
import { WorkListItem, WorkMyProgress } from '@/entities/works'
import { Text, ListItemTag } from '@/shared/ui'
import { Tag } from '@/shared/ui/tag'
import { LabLink, LabMember } from '@/widgets/lab-widgets'
import { LabMenuWrapper } from '@/widgets/menu'

export const MainPage = () => {
  return (
    <div className={'flex flex-1 flex-col justify-center gap-[30px] focus:outline-none'}>
      <div className={'flex flex-1 gap-[30px]'}>
        <section className={'flex w-[441px] flex-col gap-[30px]'}>
          <LabUserInfo />
          <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[24px]'}>
            <h3 className={'font-pretendard text-[24px] leading-[32px] font-bold'}>이번 주 일정</h3>
            <CalendarWeek />
            <CalendarListItem />
            <div className={'flex flex-col gap-[5px] rounded-[12px] border border-[#E2E3E5] px-[12px] py-[16px]'}>
              <div className={'flex items-center gap-[5px]'}>
                <ListItemTag.Red />
                <Text className={'text-[14px] font-bold'}>정기 미팅</Text>
              </div>
              <div>
                <Text className={'text-[14px] font-light'}>2025.12.11(목)</Text>
                <Text className={'text-[14px] font-light'}>8공 812호 세미나실</Text>
              </div>
            </div>
          </div>
        </section>

        <section className={'flex flex-1 flex-col gap-[30px]'}>
          <LabMenuWrapper type={'top'} />
          <div className={'flex min-h-0 flex-1 gap-[30px]'}>
            <div className={'flex flex-1 flex-col gap-[30px]'}>
              <LabIntro className={'p-[20px] md:p-[24px]'} />
              <LabLink />
              <LabMember />
            </div>
            <div className={'flex min-h-0 flex-1 flex-col gap-[14px] rounded-[24px] bg-white p-[20px]'}>
              <h3 className={'font-pretendard text-[24px] leading-[32px] font-bold'}>진행 중인 업무 현황</h3>
              <div className={'flex flex-col gap-[10px] rounded-[12px] border border-[#e2e3e5] p-[15px]'}>
                <div className={'flex flex-col gap-[5px]'}>
                  <Tag.WorkType type={'CONFERENCE'} />
                  <WorkListItem />
                </div>
                <div className={'flex flex-col gap-[5px]'}>
                  {/*<WorkProgress />*/}
                  <WorkMyProgress />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/*<PageFooter />*/}
    </div>
  )
}
