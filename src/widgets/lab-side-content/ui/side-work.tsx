import { WorkListItem, WorkMyProgress } from '@/entities/works'
import { Tag } from '@/shared/ui'

export const SideWork = () => {
  return (
    <div className={'flex h-full min-h-0 w-full flex-col gap-[15px] px-5 pb-5 lg:w-[750px] lg:px-[30px]'}>
      <div className={'flex flex-1 flex-col gap-[15px] overflow-auto'}>
        <div className={'flex flex-col gap-[10px] rounded-[12px] border border-[#e2e3e5] p-[15px]'}>
          <div className={'flex flex-col gap-[5px]'}>
            <Tag.WorkType type={'CONFERENCE'} />
            <WorkListItem />
          </div>
          <div className={'flex flex-col gap-[5px]'}>
            {/*<WorkProgress />*/}
            <WorkMyProgress />
          </div>
        </div>
        <div className={'flex flex-col gap-[10px] rounded-[12px] border border-[#e2e3e5] p-[15px]'}>
          <div className={'flex flex-col gap-[5px]'}>
            <Tag.WorkType type={'CONFERENCE'} />
            <WorkListItem />
          </div>
          <div className={'flex flex-col gap-[5px]'}>
            {/*<WorkProgress />*/}
            <WorkMyProgress />
          </div>
        </div>
        <div className={'flex flex-col gap-[10px] rounded-[12px] border border-[#e2e3e5] p-[15px]'}>
          <div className={'flex flex-col gap-[5px]'}>
            <Tag.WorkType type={'CONFERENCE'} />
            <WorkListItem />
          </div>
          <div className={'flex flex-col gap-[5px]'}>
            {/*<WorkProgress />*/}
            <WorkMyProgress />
          </div>
        </div>
        <div className={'flex flex-col gap-[10px] rounded-[12px] border border-[#e2e3e5] p-[15px]'}>
          <div className={'flex flex-col gap-[5px]'}>
            <Tag.WorkType type={'CONFERENCE'} />
            <WorkListItem />
          </div>
          <div className={'flex flex-col gap-[5px]'}>
            {/*<WorkProgress />*/}
            <WorkMyProgress />
          </div>
        </div>
      </div>
    </div>
  )
}
