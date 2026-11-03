'use client'

import { useState } from 'react'
import { cn } from '@/shared/lib'

type TabItem = {
  name: string
  content: React.ReactNode
}

type MoreModeTabsProps = {
  tabs: TabItem[]
}

export const MoreModeTabs = ({ tabs }: MoreModeTabsProps) => {
  const [currentTab, setCurrentTab] = useState(tabs[0]?.name ?? '')
  const activeTab = tabs.find(tab => tab.name === currentTab) ?? tabs[0]

  return (
    <div className={'flex flex-1 flex-col gap-4'}>
      <div className={'scrollbar-hidden flex gap-2 overflow-x-auto'}>
        {tabs.map(tab => {
          const isActive = currentTab === tab.name

          return (
            <button
              key={tab.name}
              type={'button'}
              className={cn(
                'shrink-0 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors',
                isActive ? 'bg-brand text-brand-foreground' : 'bg-card text-muted-foreground shadow-sm',
              )}
              onClick={() => setCurrentTab(tab.name)}
            >
              {tab.name}
            </button>
          )
        })}
      </div>
      <div className={'flex flex-1 flex-col'}>{activeTab?.content}</div>
    </div>
  )
}
