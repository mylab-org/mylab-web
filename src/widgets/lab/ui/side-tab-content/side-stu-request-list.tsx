import { LabRequestItem } from '@/entities/lab'

export const SideStuRequestList = ({ isBottom }: { isBottom: boolean }) => {
  return (
    <div className={'flex min-h-0 flex-1 flex-col gap-3.75 border-t border-t-gray-300 pt-2.5'}>
      <div className={`flex flex-1 flex-col gap-3.75 ${isBottom ? 'overflow-hidden' : 'overflow-auto'}`}>
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
