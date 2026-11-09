'use client'

import { MoreLabSection } from './more-lab-section'
import { MoreModeTabs } from './more-mode-tabs'
import { MoreMySection } from './more-my-section'
import { MoreServiceSection } from './more-service-section'

type MobileMoreViewProps = {
  showLabSection: boolean
}

export const MobileMoreView = ({ showLabSection }: MobileMoreViewProps) => {
  const tabs = [
    { name: '나', content: <MoreMySection isMobile /> },
    ...(showLabSection ? [{ name: '연구실', content: <MoreLabSection isMobile /> }] : []),
    { name: '서비스', content: <MoreServiceSection isMobile /> },
  ]

  return (
    <div className={'flex flex-1 flex-col gap-4'}>
      <MoreModeTabs tabs={tabs} />
    </div>
  )
}
