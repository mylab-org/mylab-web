'use client'

import { Tab } from '@/shared/ui/override/tab'
import { ConferenceWorkWrap, MeetingEtcWorkWrap, PersonalWorkWrap } from '@/widgets/works'

export const MobileWorkPage = () => {
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

  return (
    <div className={'flex flex-1 flex-col gap-2.5 bg-white px-4 py-2.5 focus:outline-none'}>
      <Tab tabs={tabs} />
    </div>
  )
}
