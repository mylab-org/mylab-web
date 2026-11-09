'use client'

import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { WorksLabSection, WorksPaperSection, WorksTaskSection } from '@/widgets/works'
import { WorksModeTabs } from '@/widgets/works/ui/works-mode-tabs'

export const MobileWorkPage = () => {
  const tabs = [
    {
      name: '연구실 전체',
      content: <WorksLabSection variant={'mobile'} />,
    },
    {
      name: '논문 업무',
      content: <WorksPaperSection variant={'mobile'} />,
    },
    {
      name: '미팅 & 개인',
      content: <WorksTaskSection variant={'mobile'} />,
    },
  ]

  return (
    <div className={'flex flex-1 flex-col gap-4 px-5 focus:outline-none'}>
      <div className={`bg-card flex min-h-0 flex-1 flex-col rounded-[20px] p-4 ${CARD_SHADOW}`}>
        <WorksModeTabs tabs={tabs} />
      </div>
    </div>
  )
}
