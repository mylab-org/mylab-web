import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { CheckBox } from '@/shared/ui/checkbox'
import { Text } from '@/shared/ui/text'
import { ToggleSwitch } from '@/shared/ui/toggle-switch'

const SideManagementItem = () => {
  const [enabled, setEnabled] = useState<boolean>(false)
  return (
    <div className={'flex items-start gap-[10px] py-[10px]'}>
      <input type="checkbox" />
      <div className={'flex flex-1 gap-[10px]'}>
        <div className={'h-[70px] w-[70px] rounded-[10px] bg-gray-200 p-[10px] lg:h-[100px] lg:w-[100px]'} />
        <div className={'flex flex-1 items-start justify-between px-[10px]'}>
          <Text className={'text-[14px] font-bold lg:text-[24px]'}>공용 모니터</Text>
          <div className={'flex items-center gap-[10px]'}>
            <Text className={'text-[8px] font-bold text-gray-500! lg:text-[16px]'}>대여 활성화</Text>
            <ToggleSwitch isSwitch={enabled} onSwitch={() => setEnabled(prev => !prev)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export const SideManagenemtList = ({ isBottom }: { isBottom: boolean }) => {
  return (
    <div className={'flex min-h-0 flex-col gap-[15px] border-t border-t-gray-300 pt-[10px]'}>
      <div className={'flex items-center justify-between'}>
        <CheckBox title="전체" />
        <Button.Menu className="font-bold">삭제</Button.Menu>
      </div>
      <div className={`flex flex-1 flex-col gap-[15px] ${isBottom ? 'overflow-hidden' : 'overflow-auto'}`}>
        <SideManagementItem />
        <SideManagementItem />
        <SideManagementItem />
        <SideManagementItem />
        <SideManagementItem />
        <SideManagementItem />
        <SideManagementItem />
      </div>
    </div>
  )
}
