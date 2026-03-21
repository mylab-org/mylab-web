import { LabDataItem } from '@/entities/lab'
import { Input } from '@/shared/ui/input'

export const SideLabDataList = ({ isBottom }: { isBottom: boolean }) => {
  return (
    <div className={'flex min-h-0 flex-1 flex-col gap-2.5 border-t border-t-gray-300 pt-2.5'}>
      <div className={'rounded-[12px] border border-gray-200 px-5'}>
        <Input className={'border-none'} placeholder={'제목으로 검색해보세요'} />
      </div>
      <div className={`flex flex-1 flex-col gap-3.75 ${isBottom ? 'overflow-hidden' : 'overflow-auto'}`}>
        <LabDataItem />
        <LabDataItem />
        <LabDataItem />
        <LabDataItem />
        <LabDataItem />
        <LabDataItem />
      </div>
    </div>
  )
}
