'use client'

import { SideWork } from '../../side/side-work'
import { DUMMY_WORKS_PAPER, DUMMY_WORKS_TASK, WorksLabCard } from '@/entities/works'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { Text } from '@/shared/ui/override/text'

export const LabWorkingSection = ({ isMobile = false }: { isMobile?: boolean }) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)

  return (
    <div
      className={cn(
        'bg-card flex w-full flex-col gap-3.5 rounded-[20px] p-5 md:p-6',
        CARD_SHADOW,
        !isMobile && 'min-h-0 flex-1',
      )}
    >
      <div className={'flex items-center justify-between gap-2'}>
        <h3 className={'min-w-0 text-[18px] leading-7 font-bold md:text-[22px] md:leading-8'}>진행 중인 업무 현황</h3>
        {isMobile && (
          <button type={'button'} className={'shrink-0'} onClick={() => openSideModal(SideWork, '진행 중인 업무 현황')}>
            <Text className={'text-brand! text-[12px] font-medium'}>전체 보기</Text>
          </button>
        )}
      </div>
      <WorksLabCard
        paper={DUMMY_WORKS_PAPER}
        className={'border-border w-full max-w-full shrink rounded-[12px] border p-4 md:w-full'}
      />
      <WorksLabCard
        task={DUMMY_WORKS_TASK}
        className={'border-border w-full max-w-full shrink rounded-[12px] border p-4 md:w-full'}
      />
    </div>
  )
}
