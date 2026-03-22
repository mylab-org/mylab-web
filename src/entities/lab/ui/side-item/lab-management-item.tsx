'use client'

import { useState } from 'react'
import { Text } from '@/shared/ui/text'
import { ToggleSwitch } from '@/shared/ui/toggle-switch'

export const LabManagementItem = () => {
  const [enabled, setEnabled] = useState<boolean>(false)
  return (
    <div className={'flex items-start gap-2.5 py-2.5'}>
      <input type="checkbox" />
      <div className={'flex flex-1 gap-2.5'}>
        <div className={'h-[70px] w-[70px] rounded-[10px] bg-gray-200 p-2.5 lg:h-[100px] lg:w-[100px]'} />
        <div className={'flex flex-1 items-start justify-between px-2.5'}>
          <Text className={'text-[14px] font-bold lg:text-[24px]'}>공용 모니터</Text>
          <ToggleSwitch
            className={'py-0'}
            isSwitch={enabled}
            onSwitch={() => setEnabled(prev => !prev)}
            title={<Text className={'text-[10px] font-bold text-gray-500 lg:text-[16px]'}>대여 활성화</Text>}
          />
        </div>
      </div>
    </div>
  )
}
