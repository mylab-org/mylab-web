import clsx from 'clsx'
import { useState } from 'react'

interface TabItem {
  name: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  leftItem?: React.ReactNode
}

export const Tab = ({ tabs, leftItem }: TabsProps) => {
  const [currentTab, setCurrentTab] = useState<string>(tabs[0].name)

  const activeTab = tabs.find(tab => tab.name === currentTab)

  return (
    <>
      <div className={'flex items-center justify-between'}>
        <div className={'flex'}>
          {tabs.map((tab, idx) => {
            const isActive = currentTab === tab.name

            return (
              <button
                key={`${tab.name}-${idx}`}
                className={clsx(
                  'font-pretendard cursor-pointer rounded-[10px] px-[15px] py-[10px] text-[14px] font-semibold lg:text-[18px]',
                  isActive ? 'bg-gray100' : 'text-gray400!',
                )}
                onClick={() => setCurrentTab(tab.name)}
              >
                {tab.name}
              </button>
            )
          })}
        </div>
        {leftItem && leftItem}
      </div>
      {activeTab?.content}
    </>
  )
}
