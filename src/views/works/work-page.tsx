'use client'

import { Tab } from '@/widgets/tab'
import { ConferenceWorkWrap, MeetingEtcWorkWrap, PersonalWorkWrap } from '@/widgets/works'

const tabs = [
  {
    name: '개인별 업무 현황',
    content: <PersonalWorkWrap />,
  },
  {
    name: '학회 업무',
    content: <ConferenceWorkWrap />,
  },
  {
    name: '미팅 준비 & 개인 업무',
    content: <MeetingEtcWorkWrap />,
  },
]

export const WorkPage = () => {
  return (
    <div className={'flex flex-1 flex-col gap-[10px] rounded-[12px] bg-white px-[30px] py-[10px] focus:outline-none'}>
      <Tab tabs={tabs} />
    </div>
  )
}
