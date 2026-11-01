'use client'

import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { SquarePlus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { WORKS_TASK_COLUMNS } from '../../config/const'
import { useWorksKanbanHook } from '../../model/use-works-kanban-hook'
import { WorksUpdateTaskModal } from '../modal/works-update-task-modal'
import { WorksDragContainer } from '../works-drag-container'
import { WorksTaskCard } from '@/entities/works'
import { getWorksTaskList } from '@/entities/works/api/get-works-task-list'
import type { TaskListResponseType } from '@/entities/works/model/types'
import { WorksCreateTaskForm } from '@/features/works'
import { patchWorksTaskStatus } from '@/features/works/api/patch-works-task-status'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import { useSideModalStore } from '@/shared/store'

type TaskKanbanItemType = TaskListResponseType & { id: number }

const groupTasksByStatus = (tasks: TaskListResponseType[]) =>
  WORKS_TASK_COLUMNS.reduce(
    (columns, { status }) => ({
      ...columns,
      [status]: tasks.filter(task => task.status === status).map(task => ({ ...task, id: task.taskId })),
    }),
    {} as Record<TaskStatusType, TaskKanbanItemType[]>,
  )

export const WorksTaskSection = () => {
  const queryClient = useQueryClient()
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const [editingTask, setEditingTask] = useState<TaskListResponseType | null>(null)

  const { data: tasks } = useQuery({
    queryKey: QUERY_KEYS.TASK.LIST,
    queryFn: getWorksTaskList,
  })

  // 카드는 드롭 즉시 옮겨 보여주고, 실패하면 서버 목록 기준으로 되돌림
  const patchWorksTaskStatusMutation = useApiMutation({
    mutationFn: ({ taskId, status }: { taskId: number; status: TaskStatusType }) =>
      patchWorksTaskStatus(taskId, { status }),
    defaultErrorMessage: '업무 상태 변경에 실패했습니다.',
    onSuccess: updatedTast => {
      queryClient.setQueryData<TaskListResponseType[]>(QUERY_KEYS.TASK.LIST, prev =>
        prev?.map(task => (task.taskId === updatedTast.taskId ? updatedTast : task)),
      )
    },
    onError: () => {
      const cachedTasks = queryClient.getQueryData<TaskListResponseType[]>(QUERY_KEYS.TASK.LIST)
      if (cachedTasks) setColumns(groupTasksByStatus(cachedTasks))
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
  } = useWorksKanbanHook<TaskStatusType, TaskKanbanItemType>({
    initialColumns: () => groupTasksByStatus(tasks ?? []),
    onColumnChange: ({ itemId, to }) => {
      patchWorksTaskStatusMutation.mutate({ taskId: Number(itemId), status: to })
    },
  })

  useEffect(() => {
    if (tasks) setColumns(groupTasksByStatus(tasks))
  }, [tasks, setColumns])

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
      <section className="relative isolate flex flex-1 flex-col gap-7.5 overflow-x-auto p-2.5 md:flex-row md:items-start md:justify-start">
        {/* 드래그 중 배경 어둡게 */}
        <div
          className={`pointer-events-none fixed inset-0 z-10 transition-opacity duration-300 ${
            isDragging ? 'bg-black/40 opacity-100' : 'bg-transparent opacity-0'
          }`}
        />

        {WORKS_TASK_COLUMNS.map(({ status }) => (
          <WorksDragContainer
            key={status}
            id={status}
            items={columns[status]}
            isDragging={isDragging}
            isConference={false}
            onEditTask={setEditingTask}
          >
            <div className="flex items-center justify-between">
              <h4
                className={`text-[16px] font-bold uppercase transition-colors duration-300 md:text-[22px] ${
                  isDragging ? 'text-white' : 'text-black'
                }`}
              >
                {status === 'READY' ? '시작 전' : status === 'IN_PROGRESS' ? '진행 중' : '완료'}
              </h4>
              {status === 'READY' && (
                <SquarePlus
                  className={`h-6 w-6 cursor-pointer md:h-7.5 md:w-7.5 ${isDragging ? 'opacity-0' : 'opacity-100'}`}
                  onClick={() => openSideModal(WorksCreateTaskForm, '업무 생성')}
                />
              )}
            </div>
          </WorksDragContainer>
        ))}
      </section>

      {/* 드래그 중인 카드 미리보기 (Portal) */}
      {createPortal(
        <DragOverlay zIndex={5}>
          {activeId && activeItem ? (
            <div className="scale-105 cursor-grabbing shadow-2xl transition-transform duration-200">
              <WorksTaskCard task={activeItem} />
            </div>
          ) : null}
        </DragOverlay>,
        document.body,
      )}

      {editingTask && (
        <WorksUpdateTaskModal
          key={editingTask.taskId}
          open
          onOpenChange={nextOpen => {
            if (!nextOpen) setEditingTask(null)
          }}
          task={editingTask}
          onSuccess={() => setEditingTask(null)}
        />
      )}
    </DndContext>
  )
}
