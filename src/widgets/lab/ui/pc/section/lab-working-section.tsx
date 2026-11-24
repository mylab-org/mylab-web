'use client'

import { useLabWorkingHook } from '../../../model/use-lab-working-hook'
import { SideWork } from '../../side/side-work'
import { WorksLabCard } from '@/entities/works'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { Text } from '@/shared/ui/override/text'

const cardClassName = 'border-border w-full max-w-full shrink rounded-[12px] border p-4 md:w-full'

export const LabWorkingSection = ({ isMobile = false }: { isMobile?: boolean }) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const { previewItems, remainingCount, isPending, isError, isEmpty } = useLabWorkingHook()

  const openAllWorks = () => openSideModal(SideWork, '진행 중인 업무 현황')

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
        {remainingCount > 0 && (
          <button type={'button'} className={'shrink-0'} onClick={openAllWorks}>
            <Text className={'text-brand! text-[12px] font-medium'}>전체 보기</Text>
          </button>
        )}
      </div>

      <div className={'flex flex-col gap-3.5'}>
        {isPending ? (
          <Text className={'text-subtle-foreground py-5 text-center text-[14px]'}>업무를 불러오는 중입니다</Text>
        ) : isError ? (
          <Text className={'text-error! py-5 text-center text-[14px]'}>진행 중인 업무를 불러오지 못했습니다</Text>
        ) : isEmpty ? (
          <Text className={'text-subtle-foreground py-5 text-center text-[14px]'}>진행 중인 업무가 없습니다</Text>
        ) : (
          <>
            {previewItems.map(item =>
              item.kind === 'paper' ? (
                <WorksLabCard key={`paper-${item.paper.id}`} paper={item.paper} className={cardClassName} />
              ) : (
                <WorksLabCard key={`task-${item.task.taskId}`} task={item.task} className={cardClassName} />
              ),
            )}
            {remainingCount > 0 && (
              <button
                type={'button'}
                onClick={openAllWorks}
                className={
                  'border-border bg-muted/40 text-subtle-foreground hover:bg-muted hover:text-foreground flex w-full items-center justify-center rounded-[12px] border border-dashed px-3 py-3 text-[13px] font-medium transition-colors'
                }
              >
                외 {remainingCount}개 더 보기
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}
