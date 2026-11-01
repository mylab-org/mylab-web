import { DUMMY_WORKS_PAPER, DUMMY_WORKS_TASK, WorksLabCard } from '@/entities/works'

export const SideWork = () => {
  return (
    <div className={'flex h-full min-h-0 w-full flex-col gap-3.75 px-5 pb-5 lg:w-[750px] lg:px-7.5'}>
      <div className={'flex flex-1 flex-col gap-3.75 overflow-auto'}>
        <WorksLabCard paper={DUMMY_WORKS_PAPER} className={'rounded-[12px] border border-[#e2e3e5] p-4 md:w-full'} />
        <WorksLabCard task={DUMMY_WORKS_TASK} className={'rounded-[12px] border border-[#e2e3e5] p-4 md:w-full'} />
        <WorksLabCard paper={DUMMY_WORKS_PAPER} className={'rounded-[12px] border border-[#e2e3e5] p-4 md:w-full'} />
        <WorksLabCard task={DUMMY_WORKS_TASK} className={'rounded-[12px] border border-[#e2e3e5] p-4 md:w-full'} />
      </div>
    </div>
  )
}
