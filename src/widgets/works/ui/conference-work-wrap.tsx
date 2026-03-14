'use client'

import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ConferenceCard } from '@/entities/works'
import { Container } from '@/widgets/works/ui/container'
import type { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core'

const initialData: Record<string, any[]> = {
  READY: [
    { id: 'conf-1', type: 'CONFERENCE' },
    { id: 'conf-2', type: 'CONFERENCE' },
    { id: 'conf-3', type: 'CONFERENCE' },
    { id: 'conf-4', type: 'CONFERENCE' },
    { id: 'conf-5', type: 'CONFERENCE' },
    { id: 'conf-6', type: 'CONFERENCE' },
  ],
  PROGRESS: [{ id: 'conf-7', type: 'CONFERENCE', isDeadLine: true }],
  DRAFT: [],
  REVIEW: [{ id: 'conf-8', type: 'CONFERENCE', isDeadLine: true }],
  DONE: [{ id: 'conf-9', type: 'CONFERENCE', isEnd: true }],
}

export const ConferenceWorkWrap = () => {
  const [data, setData] = useState(initialData)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(true)
  }, [])

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10, // PC: 클릭 실수 방지
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // 모바일: 스크롤과 드래그 구분
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // PC row 레이아웃에서 컬럼 간 이동을 부드럽게 만드는 충돌 전략
  const collisionDetectionStrategy = (args: any) => {
    const pointerCollisions = pointerWithin(args)
    if (pointerCollisions.length > 0) {
      return pointerCollisions
    }
    return closestCorners(args)
  }

  const findContainer = (id: string) => {
    if (id in data) return id
    return Object.keys(data).find(key => data[key].some(item => item.id === id))
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
    setIsDragging(true)
    if (window.navigator.vibrate) window.navigator.vibrate(50)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    const activeContainer = findContainer(activeId)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer || activeContainer === overContainer) return

    setData(prev => {
      const activeItems = prev[activeContainer]
      const overItems = prev[overContainer]
      const activeIndex = activeItems.findIndex(i => i.id === activeId)
      const overIndex = overItems.findIndex(i => i.id === overId)

      let newIndex: number
      if (overId in prev) {
        newIndex = overItems.length
      } else {
        newIndex = overIndex >= 0 ? overIndex : overItems.length
      }

      return {
        ...prev,
        [activeContainer]: activeItems.filter(i => i.id !== activeId),
        [overContainer]: [...overItems.slice(0, newIndex), activeItems[activeIndex], ...overItems.slice(newIndex)],
      }
    })
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    const activeContainer = findContainer(active.id as string)
    const overContainer = over ? findContainer(over.id as string) : null

    if (activeContainer && overContainer && activeContainer === overContainer) {
      const activeIndex = data[activeContainer].findIndex(i => i.id === active.id)
      const overIndex = data[overContainer].findIndex(i => i.id === over!.id)

      if (activeIndex !== overIndex) {
        setData(prev => ({
          ...prev,
          [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
        }))
      }
    }
    setActiveId(null)
    setIsDragging(false)
  }

  if (!enabled) return null

  // 드래그 중인 아이템 데이터 찾기
  const activeItem = activeId
    ? Object.values(data)
        .flat()
        .find(i => i.id === activeId)
    : null

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <section className="relative flex flex-1 flex-col gap-[30px] overflow-x-auto p-[10px] md:flex-row md:items-start md:justify-start">
        {/* 드래그 배경 오버레이 */}
        <div
          className={`pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 ${
            isDragging ? 'bg-black/40 opacity-100' : 'bg-transparent opacity-0'
          }`}
        />

        {Object.entries(data).map(([columnId, items]) => (
          <Container key={columnId} id={columnId} items={items} isDragging={isDragging} isConference={true}>
            <h4 className={`text-[18px] font-bold transition-colors duration-300 md:text-[22px]`}>
              {columnId === 'READY' && '연구 준비'}
              {columnId === 'PROGRESS' && '실험 진행'}
              {columnId === 'DRAFT' && '초안 작성'}
              {columnId === 'REVIEW' && '교수 검토'}
              {columnId === 'DONE' && '완료'}
            </h4>
          </Container>
        ))}
      </section>

      {createPortal(
        <DragOverlay zIndex={1000}>
          {activeId && activeItem ? (
            <div className="scale-105 cursor-grabbing shadow-2xl transition-transform duration-200">
              {/* Conference 전용 카드 렌더링 */}
              <ConferenceCard id={'eee'} isDeadLine={activeItem.isDeadLine} isEnd={activeItem.isEnd} />
            </div>
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}
