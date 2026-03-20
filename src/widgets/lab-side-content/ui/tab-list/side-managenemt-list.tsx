import { LabManagementItem } from '@/entities/lab-side'
import { Button } from '@/shared/ui/button'
import { CheckBox } from '@/shared/ui/checkbox'

export const SideManagenemtList = ({ isBottom }: { isBottom: boolean }) => {
  return (
    <div className={'flex min-h-0 flex-col gap-[15px] border-t border-t-gray-300 pt-[10px]'}>
      <div className={'flex items-center justify-between'}>
        <CheckBox title="전체" />
        <Button.Menu className="font-bold">삭제</Button.Menu>
      </div>
      <div className={`flex flex-1 flex-col gap-[15px] ${isBottom ? 'overflow-hidden' : 'overflow-auto'}`}>
        <LabManagementItem />
        <LabManagementItem />
        <LabManagementItem />
        <LabManagementItem />
      </div>
    </div>
  )
}
