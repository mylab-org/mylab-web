'use client'

import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { WorksLabSection, WorksPaperSection, WorksTaskSection } from '@/widgets/works'
import { WorksModeTabs } from '@/widgets/works/ui/works-mode-tabs'

const tabs = [
  {
    name: '연구실 전체',
    content: <WorksLabSection />,
  },
  {
    name: '논문 업무',
    content: <WorksPaperSection variant={'pc'} />,
  },
  {
    name: '미팅 & 개인',
    content: <WorksTaskSection variant={'pc'} />,
  },
]

export const WorkPage = () => {
  return (
    <div
      className={`flex min-h-0 min-w-0 flex-1 flex-col rounded-[20px] bg-white p-5 ${CARD_SHADOW} focus:outline-none`}
    >
      <WorksModeTabs tabs={tabs} />
    </div>
  )
}
