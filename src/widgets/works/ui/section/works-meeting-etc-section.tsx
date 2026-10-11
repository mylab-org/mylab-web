'use client'

import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SquarePlus } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useWorksKanbanHook } from '../../model/use-works-kanban-hook'
import { WorksCreateMeetEtc } from '../side/works-create-meet-etc'
import { WorksDragContainer } from '../works-drag-container'
import { WorksMeetEtcCard } from '@/entities/works'
import { useSideModalStore } from '@/shared/store'

const initialData: Record<string, any[]> = {
  todo: [{ id: '1', title: '업무 1', type: 'MEET' }],
  doing: [
    { id: '2', title: '업무 2', type: 'PERSONAL' },
    { id: '3', title: '업무 3', type: 'PERSONAL' },
    { id: '4', title: '업무 4', type: 'PERSONAL' },
    { id: '5', title: '업무 5', type: 'PERSONAL' },
    { id: '6', title: '업무 6', type: 'PERSONAL' },
    { id: '7', title: '업무 7', type: 'PERSONAL' },
    { id: '8', title: '업무 8', type: 'PERSONAL' },
  ],
  done: [],
}

export const WorksMeetingEtcSection = () => {
  const openSideModal = useSideModalStore(state => state.openSideModal)

  const {
    columns,
    activeId,
    activeItem,
    isDragging,
    enabled,
    sensors,
    collisionDetectionStrategy,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
  } = useWorksKanbanHook({ initialColumns: initialData })

  if (!enabled) return null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {/* 반응형 레이아웃: 기본 flex-col(모바일), md 이상 flex-row(PC) */}
      <section className="relative flex flex-1 flex-col gap-7.5 overflow-x-auto p-2.5 md:flex-row md:items-start md:justify-start">
        {/* 드래그 중 배경 어둡게 */}
        <div
          className={`pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 ${
            isDragging ? 'bg-black/40 opacity-100' : 'bg-transparent opacity-0'
          }`}
        />

        {Object.entries(columns).map(([columnId, items]) => (
          <WorksDragContainer key={columnId} id={columnId} items={items} isDragging={isDragging} isConference={false}>
            <div className="flex items-center justify-between">
              <h4
                className={`text-[16px] font-bold uppercase transition-colors duration-300 md:text-[22px] ${
                  isDragging ? 'text-white' : 'text-black'
                }`}
              >
                {columnId === 'todo' ? '시작 전' : columnId === 'doing' ? '진행 중' : '완료'}
              </h4>
              {columnId !== 'done' && (
                <SquarePlus
                  className={`h-6 w-6 cursor-pointer md:h-7.5 md:w-7.5 ${isDragging ? 'opacity-0' : 'opacity-100'}`}
                  onClick={() => openSideModal(WorksCreateMeetEtc, '업무 생성')}
                />
              )}
            </div>
          </WorksDragContainer>
        ))}
      </section>

      {/* 드래그 중인 카드 미리보기 (Portal) */}
      {createPortal(
        <DragOverlay zIndex={1000}>
          {activeId ? (
            <div className="scale-105 cursor-grabbing shadow-2xl transition-transform duration-200">
              <WorksMeetEtcCard id={'test'} type={activeItem?.type} />
            </div>
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}
