'use client'

import { WorkListItem } from '@/entities/works'

export const LabWorkingSection = () => {
  return (
    <div
      className={
        'flex min-h-0 flex-1 flex-col gap-3.5 rounded-[24px] bg-white p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_4px_16px_rgba(0,0,0,0.04)]'
      }
    >
      <h3 className={'text-[24px] leading-8 font-bold'}>진행 중인 업무 현황</h3>
      <WorkListItem className={'rounded-[12px] border border-[#e2e3e5] p-4 md:w-full'} />
      <WorkListItem className={'rounded-[12px] border border-[#e2e3e5] p-4 md:w-full'} />
    </div>
  )
}
