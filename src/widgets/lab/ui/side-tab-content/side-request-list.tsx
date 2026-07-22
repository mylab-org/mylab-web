import { LabRequestItem } from '@/entities/lab'
import { Button } from '@/shared/ui/override/button'
import { CheckBox } from '@/shared/ui/override/checkbox'

export const SideRequestList = ({ isBottom }: { isBottom: boolean }) => {
  return (
    <div className={'flex min-h-0 flex-col gap-3.75 border-t border-t-gray-300 pt-2.5'}>
      <div className={'flex items-center justify-between'}>
        <CheckBox title="전체" />
        <div className={'flex items-center gap-5'}>
          <Button.Menu className="font-bold">승인</Button.Menu>
          <Button.Menu className="font-bold">반려</Button.Menu>
        </div>
      </div>
      <div className={`flex flex-col gap-3.75 ${isBottom ? 'overflow-hidden' : 'overflow-auto'}`}>
        <LabRequestItem isCheck />
        <LabRequestItem isCheck />
        <LabRequestItem isCheck />
        <LabRequestItem isCheck />
        <LabRequestItem isCheck />
        <LabRequestItem isCheck />
      </div>
    </div>
  )
}
