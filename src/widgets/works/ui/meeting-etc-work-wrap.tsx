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
import { Image } from 'next/dist/client/image-component'
import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { MeetEtcCard } from '@/entities/works'
import { useSideModalStore } from '@/shared/store'
import { WorkCreateContent } from '@/widgets/work-side-content'
import { Container } from '@/widgets/works/ui/container'
import type { DragEndEvent, DragOverEvent, DragStart } from '@dnd-kit/core'

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

export const MeetingEtcWorkWrap = () => {
  const [data, setData] = useState(initialData)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const openSideModal = useSideModalStore(state => state.openSideModal)

  useEffect(() => {
    setEnabled(true)
  }, [])

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10, // PC: 미세한 클릭에는 반응하지 않고 10px 이동 시 드래그 시작
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250, // 모바일: 0.25초 꾹 눌러야 드래그 (스크롤 방해 금지)
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // [핵심] PC 가로 배치 레이아웃에서 컬럼 인식을 정확하게 하는 전략
  const collisionDetectionStrategy = (args: any) => {
    // 1. 먼저 포인터(마우스/터치)가 직접적으로 올라가 있는 컨테이너를 찾습니다.
    const pointerCollisions = pointerWithin(args)
    if (pointerCollisions.length > 0) {
      return pointerCollisions
    }

    // 2. 포인터 아래에 아무것도 없다면(간격 사이 등), 가장 가까운 모서리를 계산합니다.
    return closestCorners(args)
  }

  const findContainer = (id: string) => {
    if (id in data) return id
    return Object.keys(data).find(key => data[key].some(item => item.id === id))
  }

  const handleDragStart = (event: DragStart) => {
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
      const overIndex = data[overContainer].findIndex(i => i.id === over.id)

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

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {/* 반응형 레이아웃: 기본 flex-col(모바일), md 이상 flex-row(PC) */}
      <section className="relative flex flex-1 flex-col gap-[30px] overflow-x-auto p-[10px] md:flex-row md:items-start md:justify-start">
        {/* 드래그 중 배경 어둡게 */}
        <div
          className={`pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 ${
            isDragging ? 'bg-black/40 opacity-100' : 'bg-transparent opacity-0'
          }`}
        />

        {Object.entries(data).map(([columnId, items]) => (
          <Container key={columnId} id={columnId} items={items} isDragging={isDragging} isConference={false}>
            <div className="flex items-center justify-between">
              <h4
                className={`font-pretendard text-[16px] font-bold uppercase transition-colors duration-300 md:text-[22px] ${
                  isDragging ? 'text-white' : 'text-black'
                }`}
              >
                {columnId === 'todo' ? '시작 전' : columnId === 'doing' ? '진행 중' : '완료'}
              </h4>
              {columnId !== 'done' && (
                <Image
                  src="/icon/icon_main_add.svg"
                  alt="add"
                  width={30}
                  height={30}
                  className={`h-[24px] w-[24px] cursor-pointer md:h-[30px] md:w-[30px] ${
                    isDragging ? 'opacity-0' : 'opacity-100'
                  }`}
                  onClick={() => openSideModal(WorkCreateContent, '업무 생성')}
                />
              )}
            </div>
          </Container>
        ))}
      </section>

      {/* 드래그 중인 카드 미리보기 (Portal) */}
      {createPortal(
        <DragOverlay zIndex={1000}>
          {activeId ? (
            <div className="scale-105 cursor-grabbing shadow-2xl transition-transform duration-200">
              <MeetEtcCard
                id={'test'}
                type={
                  Object.values(data)
                    .flat()
                    .find(i => i.id === activeId)?.type
                }
              />
            </div>
          ) : null}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  )
}
