import { LabRequestItem } from '@/entities/lab-side'

export const SideStuRequestList = ({ isBottom }: { isBottom: boolean }) => {
  return (
    <div className={'flex min-h-0 flex-1 flex-col gap-[15px] border-t border-t-gray-300 pt-[10px]'}>
      <div className={`flex flex-1 flex-col gap-[15px] ${isBottom ? 'overflow-hidden' : 'overflow-auto'}`}>
        <LabRequestItem />
        <LabRequestItem />
        <LabRequestItem />
        <LabRequestItem />
        <LabRequestItem />
        <LabRequestItem />
      </div>
    </div>
  )
}
