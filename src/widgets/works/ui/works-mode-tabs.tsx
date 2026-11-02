'use client'

import { useState } from 'react'
import { cn } from '@/shared/lib'

type TabItem = {
  name: string
  content: React.ReactNode
}

type WorksModeTabsProps = {
  tabs: TabItem[]
  rightItem?: React.ReactNode
}

export const WorksModeTabs = ({ tabs, rightItem }: WorksModeTabsProps) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]?.name ?? '')
  const activeTab = tabs.find(tab => tab.name === currentTab) ?? tabs[0]

  return (
    <div className={'flex min-h-0 flex-1 flex-col gap-4'}>
      <div className={'flex items-center justify-between gap-3'}>
        <div className={'scrollbar-hidden flex gap-2 overflow-x-auto'}>
          {tabs.map(tab => {
            const isActive = currentTab === tab.name

            return (
              <button
                key={tab.name}
                type={'button'}
                className={cn(
                  'shrink-0 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors md:text-[15px]',
                  isActive ? 'bg-[#2562CD] text-white' : 'bg-gray-100 text-gray-500',
                )}
                onClick={() => setCurrentTab(tab.name)}
              >
                {tab.name}
              </button>
            )
          })}
        </div>
        {rightItem}
      </div>
      <div className={'flex min-h-0 min-w-0 flex-1 flex-col'}>{activeTab?.content}</div>
    </div>
  )
}
