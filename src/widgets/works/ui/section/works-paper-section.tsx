'use client'

import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { WORKS_PAPER_COLUMNS } from '../../config/const'
import { useWorksKanbanHook } from '../../model/use-works-kanban-hook'
import { WorkPaperDetail } from '../side/works-paper-detail'
import { WorksDragContainer } from '../works-drag-container'
import { WorksMobileStatusDropRow } from '../works-mobile-status-drop-row'
import { WorksStatusChips } from '../works-status-chips'
import { useUsersMeHook } from '@/entities/user'
import { WorksPaperCard } from '@/entities/works'
import { getWorksPaperList } from '@/entities/works/api/get-works-paper-list'
import type { WorksPaperListResponseType } from '@/entities/works/model/types'
import { WorksCreatePaperForm } from '@/features/works'
import { patchWorksPaperStatus } from '@/features/works/api/patch-works-paper-status'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import { useSideModalStore } from '@/shared/store'
import { Text } from '@/shared/ui/override/text'

const groupPapersByStatus = (papers: WorksPaperListResponseType[]) =>
  WORKS_PAPER_COLUMNS.reduce(
    (columns, { status }) => ({ ...columns, [status]: papers.filter(paper => paper.status === status) }),
    {} as Record<PaperStatusType, WorksPaperListResponseType[]>,
  )

type WorksPaperSectionProps = {
  variant?: 'pc' | 'mobile'
}

export const WorksPaperSection = ({ variant = 'pc' }: WorksPaperSectionProps) => {
  const isMobile = variant === 'mobile'
  const queryClient = useQueryClient()
  const { me } = useUsersMeHook()
  const labId = me?.lab?.labId
  const paperListQueryKey = QUERY_KEYS.PAPER.LIST(labId ?? 0)
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const [activeStatus, setActiveStatus] = useState<PaperStatusType>('RESEARCH_PREP')

  const { data: papers, isPending } = useQuery({
    queryKey: paperListQueryKey,
    queryFn: () => getWorksPaperList(labId ?? 0),
    enabled: labId !== undefined,
  })

  const openCreate = () => openSideModal(WorksCreatePaperForm, '논문 생성')

  const patchWorksPaperStatusMutation = useApiMutation({
    mutationFn: ({ paperId, status }: { paperId: number; status: PaperStatusType }) =>
      patchWorksPaperStatus(labId ?? 0, paperId, { status }),
    defaultErrorMessage: '논문 상태 변경에 실패했습니다.',
    onSuccess: updatedPaper => {
      queryClient.setQueryData<WorksPaperListResponseType[]>(paperListQueryKey, prev =>
        prev?.map(paper => (paper.id === updatedPaper.id ? updatedPaper : paper)),
      )
    },
    onError: () => {
      const cachedPapers = queryClient.getQueryData<WorksPaperListResponseType[]>(paperListQueryKey)
      if (cachedPapers) setColumns(groupPapersByStatus(cachedPapers))
    },
  })

  const {
    columns,
    setColumns,
    activeId,
    activeItem,
    isDragging,
    enabled,
    sensors,
    collisionDetectionStrategy,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useWorksKanbanHook<PaperStatusType, WorksPaperListResponseType>({
    initialColumns: () => groupPapersByStatus(papers ?? []),
    onColumnChange: ({ itemId, to }) => {
      patchWorksPaperStatusMutation.mutate({ paperId: Number(itemId), status: to })
    },
  })

  useEffect(() => {
    if (papers) setColumns(groupPapersByStatus(papers))
  }, [papers, setColumns])

  if (!enabled || isPending) {
    return <Text className={'text-subtle-foreground! py-8 text-center text-[14px]'}>논문 업무를 불러오는 중...</Text>
  }

  const visibleColumns = isMobile
    ? WORKS_PAPER_COLUMNS.filter(column => column.status === activeStatus)
    : WORKS_PAPER_COLUMNS

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <section className={'relative isolate flex flex-1 flex-col gap-4'}>
        {isMobile && (
          <div className={'flex flex-col gap-3'}>
            <div className={'flex items-center justify-between gap-2'}>
              <Text className={'text-[14px] font-semibold'}>논문 칸반</Text>
              <button
                type={'button'}
                onClick={openCreate}
                className={
                  'bg-brand inline-flex items-center gap-1 rounded-[10px] px-3 py-1.5 text-[12px] font-semibold text-white'
                }
              >
                <Plus className={'h-3.5 w-3.5'} />
                생성
              </button>
            </div>
            <WorksStatusChips
              items={WORKS_PAPER_COLUMNS.map(({ status, label }) => ({
                status,
                label,
                count: columns[status]?.length ?? 0,
              }))}
              activeStatus={activeStatus}
              onChange={status => setActiveStatus(status as PaperStatusType)}
            />
            <WorksMobileStatusDropRow items={WORKS_PAPER_COLUMNS} activeStatus={activeStatus} isDragging={isDragging} />
          </div>
        )}

        <div
          className={`pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 ${
            isDragging ? (isMobile ? 'bg-black/20 opacity-100' : 'bg-black/30 opacity-100') : 'bg-transparent opacity-0'
          }`}
        />

        <div className={'flex flex-1 flex-col gap-4 overflow-x-auto md:flex-row md:items-start md:justify-start'}>
          {visibleColumns.map(({ status, label }) => (
            <WorksDragContainer
              key={status}
              id={status}
              items={columns[status]}
              isDragging={isDragging}
              isConference={true}
              variant={variant}
              onCreate={status === 'RESEARCH_PREP' ? openCreate : undefined}
              createLabel={'논문 만들기'}
            >
              {!isMobile && (
                <div className={'flex items-center justify-between gap-2 px-0.5'}>
                  <h4 className={'text-[16px] font-bold md:text-[18px]'}>
                    {label}
                    <span className={'text-subtle-foreground ml-1.5 text-[13px] font-medium'}>
                      {columns[status]?.length ?? 0}
                    </span>
                  </h4>
                  {status === 'RESEARCH_PREP' && (
                    <button
                      type={'button'}
                      onClick={openCreate}
                      className={`border-brand/30 bg-brand/5 text-brand inline-flex items-center gap-1 rounded-[10px] border px-2.5 py-1.5 text-[12px] font-semibold ${
                        isDragging ? 'opacity-0' : 'opacity-100'
                      }`}
                    >
                      <Plus className={'h-3.5 w-3.5'} />
                      생성
                    </button>
                  )}
                </div>
              )}
            </WorksDragContainer>
          ))}
        </div>
      </section>

      {createPortal(
        <DragOverlay zIndex={5}>
          {activeId && activeItem ? (
            <div className={'scale-105 cursor-grabbing shadow-2xl transition-transform duration-200'}>
              <WorksPaperCard paper={activeItem} detailComponent={() => <WorkPaperDetail paperId={activeItem.id} />} />
            </div>
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}
