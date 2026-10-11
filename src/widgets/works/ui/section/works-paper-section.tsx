'use client'

import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SquarePlus } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { WOROS_PAPER_COLUMNS } from '../../config/const'
import { useWorksKanbanHook } from '../../model/use-works-kanban-hook'
import { WorksCreatePaper } from '../side/works-create-paper'
import { WorkPaperDetail } from '../side/works-paper-detail'
import { WorksDragContainer } from '../works-drag-container'
import { WorksPaperCard } from '@/entities/works'
import { getWorksPaperList } from '@/entities/works/api/get-works-paper-list'
import type { WorksPaperListResponseType } from '@/entities/works/model/types'
import { patchWorksPaperStatus } from '@/features/works/api/patch-works-paper-status'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { TEST_LAB_ID } from '@/shared/constant/test'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import { useSideModalStore } from '@/shared/store'

const groupPapersByStatus = (papers: WorksPaperListResponseType[]) =>
  WOROS_PAPER_COLUMNS.reduce(
    (columns, { status }) => ({ ...columns, [status]: papers.filter(paper => paper.status === status) }),
    {} as Record<PaperStatusType, WorksPaperListResponseType[]>,
  )

export const WorksPaperSection = () => {
  const queryClient = useQueryClient()
  const paperListQueryKey = QUERY_KEYS.PAPER.LIST(TEST_LAB_ID)
  const openSideModal = useSideModalStore(state => state.openSideModal)

  const { data: papers } = useQuery({
    queryKey: paperListQueryKey,
    queryFn: () => getWorksPaperList(TEST_LAB_ID),
  })

  // 카드는 드롭 즉시 옮겨 보여주고, 실패하면 서버 목록 기준으로 되돌림
  const patchWorksPaperStatusMutation = useApiMutation({
    mutationFn: ({ paperId, status }: { paperId: number; status: PaperStatusType }) =>
      patchWorksPaperStatus(TEST_LAB_ID, paperId, { status }),
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

  if (!enabled) return null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <section className="relative flex flex-1 flex-col gap-7.5 overflow-x-auto p-2.5 md:flex-row md:items-start md:justify-start">
        {/* 드래그 배경 오버레이 */}
        <div
          className={`pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 ${
            isDragging ? 'bg-black/40 opacity-100' : 'bg-transparent opacity-0'
          }`}
        />

        {WOROS_PAPER_COLUMNS.map(({ status, label }) => (
          <WorksDragContainer
            key={status}
            id={status}
            items={columns[status]}
            isDragging={isDragging}
            isConference={true}
          >
            <div className="flex items-center justify-between">
              <h4 className={`text-[18px] font-bold transition-colors duration-300 md:text-[22px]`}>{label}</h4>
              {/* 서버가 신규 논문을 항상 연구 준비(RESEARCH_PREP) 단계로 생성하므로 연구 준비 컬럼에만 노출합니다. */}
              {status === 'RESEARCH_PREP' && (
                <SquarePlus
                  className={`h-6 w-6 cursor-pointer md:h-7.5 md:w-7.5 ${isDragging ? 'opacity-0' : 'opacity-100'}`}
                  onClick={() => openSideModal(WorksCreatePaper, '업무 생성')}
                />
              )}
            </div>
          </WorksDragContainer>
        ))}
      </section>

      {createPortal(
        <DragOverlay zIndex={1000}>
          {activeId && activeItem ? (
            <div className="scale-105 cursor-grabbing shadow-2xl transition-transform duration-200">
              {/* Conference 전용 카드 렌더링 */}
              <WorksPaperCard paper={activeItem} detailComponent={WorkPaperDetail} />
            </div>
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}
