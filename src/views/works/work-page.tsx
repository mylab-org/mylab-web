'use client'

import { Tab } from '@/shared/ui/tab'
import { ConferenceWorkWrap, MeetingEtcWorkWrap, PersonalWorkWrap } from '@/widgets/works'

const tabs = [
  {
    name: '연구실 전체',
    content: <PersonalWorkWrap />,
  },
  {
    name: '학회 업무',
    content: <ConferenceWorkWrap />,
  },
  {
    name: '미팅 & 개인',
    content: <MeetingEtcWorkWrap />,
  },
]

export const WorkPage = () => {
  return (
    <div
      className={
        'flex flex-1 flex-col gap-2.5 rounded-[12px] bg-white px-7.5 py-2.5 shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_4px_16px_rgba(0,0,0,0.04)] focus:outline-none'
      }
    >
      <Tab tabs={tabs} />
    </div>
  )
}
