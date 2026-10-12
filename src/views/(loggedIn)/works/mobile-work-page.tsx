'use client'

import { Tab } from '@/shared/ui/override/tab'
import { WorksMeetingEtcSection, WorksPaperSection, WorksLabSection } from '@/widgets/works'

export const MobileWorkPage = () => {
  const tabs = [
    {
      name: '연구실 전체',
      content: <WorksLabSection />,
    },
    {
      name: '논문 업무',
      content: <WorksPaperSection />,
    },
    {
      name: '미팅 & 개인',
      content: <WorksMeetingEtcSection />,
    },
  ]

  return (
    <div className={'flex flex-1 flex-col gap-2.5 bg-white px-4 py-2.5 focus:outline-none'}>
      <Tab tabs={tabs} />
    </div>
  )
}
