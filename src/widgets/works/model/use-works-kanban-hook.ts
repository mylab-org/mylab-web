'use client'

import {
  closestCorners,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  pointerWithin,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useEffect, useRef, useState } from 'react'
import type { CollisionDetection, DragEndEvent, DragOverEvent, DragStartEvent, UniqueIdentifier } from '@dnd-kit/core'

type KanbanColumnsType<TColumn extends string, TItem> = Record<TColumn, TItem[]>

type UseWorksKanbanHookProps<TColumn extends string, TItem extends { id: UniqueIdentifier }> = {
  initialColumns: KanbanColumnsType<TColumn, TItem> | (() => KanbanColumnsType<TColumn, TItem>)
  /** 드래그가 끝났을 때 카드가 다른 컬럼으로 옮겨졌다면 호출 */
  onColumnChange?: (params: { itemId: UniqueIdentifier; from: TColumn; to: TColumn }) => void
}

export const useWorksKanbanHook = <TColumn extends string, TItem extends { id: UniqueIdentifier }>({
  initialColumns,
  onColumnChange,
}: UseWorksKanbanHookProps<TColumn, TItem>) => {
  const [columns, setColumns] = useState<KanbanColumnsType<TColumn, TItem>>(initialColumns)
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [enabled, setEnabled] = useState(false)
  // 드래그 시작 시점의 컬럼 — 드래그가 끝났을 때 컬럼이 바뀌었는지 비교하는 기준
  const dragStartColumnRef = useRef<TColumn | null>(null)

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
  const collisionDetectionStrategy: CollisionDetection = args => {
    // 1. 먼저 포인터(마우스/터치)가 직접적으로 올라가 있는 컨테이너를 찾습니다.
    const pointerCollisions = pointerWithin(args)
    if (pointerCollisions.length > 0) {
      return pointerCollisions
    }

    // 2. 포인터 아래에 아무것도 없다면(간격 사이 등), 가장 가까운 모서리를 계산합니다.
    return closestCorners(args)
  }

  const findContainer = (id: UniqueIdentifier) => {
    if (id in columns) return id as TColumn
    return (Object.keys(columns) as TColumn[]).find(key => columns[key].some(item => item.id === id))
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id)
    dragStartColumnRef.current = findContainer(event.active.id) ?? null
    setIsDragging(true)
    if (window.navigator.vibrate) window.navigator.vibrate(50)
  }

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeId = active.id
    const overId = over.id

    const activeContainer = findContainer(activeId)
    const overContainer = findContainer(overId)

    if (!activeContainer || !overContainer || activeContainer === overContainer) return

    setColumns(prev => {
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
    const activeContainer = findContainer(active.id)
    const overContainer = over ? findContainer(over.id) : null

    if (activeContainer && overContainer && activeContainer === overContainer) {
      const activeIndex = columns[activeContainer].findIndex(i => i.id === active.id)
      const overIndex = columns[overContainer].findIndex(i => i.id === over!.id)

      if (activeIndex !== overIndex) {
        setColumns(prev => ({
          ...prev,
          [overContainer]: arrayMove(prev[overContainer], activeIndex, overIndex),
        }))
      }
    }

    const startContainer = dragStartColumnRef.current
    if (startContainer && activeContainer && startContainer !== activeContainer) {
      onColumnChange?.({ itemId: active.id, from: startContainer, to: activeContainer })
    }

    dragStartColumnRef.current = null
    setActiveId(null)
    setIsDragging(false)
  }

  // 드래그 중인 아이템 데이터 찾기
  const activeItem = activeId
    ? (Object.values(columns) as TItem[][]).flat().find(item => item.id === activeId)
    : undefined

  return {
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
  }
}
