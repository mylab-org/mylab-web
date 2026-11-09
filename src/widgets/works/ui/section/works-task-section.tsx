'use client'

import { DndContext, DragOverlay } from '@dnd-kit/core'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { WORKS_TASK_COLUMNS } from '../../config/const'
import { useWorksKanbanHook } from '../../model/use-works-kanban-hook'
import { WorksUpdateTaskModal } from '../modal/works-update-task-modal'
import { WorksDragContainer } from '../works-drag-container'
import { WorksMobileStatusDropRow } from '../works-mobile-status-drop-row'
import { WorksStatusChips } from '../works-status-chips'
import { WorksTaskCard } from '@/entities/works'
import { getWorksTaskList } from '@/entities/works/api/get-works-task-list'
import type { TaskListResponseType } from '@/entities/works/model/types'
import { WorksCreateTaskForm } from '@/features/works'
import { patchWorksTaskStatus } from '@/features/works/api/patch-works-task-status'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import { useSideModalStore } from '@/shared/store'
import { Text } from '@/shared/ui/override/text'

type TaskKanbanItemType = TaskListResponseType & { id: number }

const groupTasksByStatus = (tasks: TaskListResponseType[]) =>
  WORKS_TASK_COLUMNS.reduce(
    (columns, { status }) => ({
      ...columns,
      [status]: tasks.filter(task => task.status === status).map(task => ({ ...task, id: task.taskId })),
    }),
    {} as Record<TaskStatusType, TaskKanbanItemType[]>,
  )

type WorksTaskSectionProps = {
  variant?: 'pc' | 'mobile'
}

export const WorksTaskSection = ({ variant = 'pc' }: WorksTaskSectionProps) => {
  const isMobile = variant === 'mobile'
  const queryClient = useQueryClient()
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const [editingTask, setEditingTask] = useState<TaskListResponseType | null>(null)
  const [activeStatus, setActiveStatus] = useState<TaskStatusType>('READY')

  const { data: tasks, isPending } = useQuery({
    queryKey: QUERY_KEYS.TASK.LIST,
    queryFn: getWorksTaskList,
  })

  const openCreate = () => openSideModal(WorksCreateTaskForm, '업무 생성')

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

  if (!enabled || isPending) {
    return <Text className={'text-subtle-foreground! py-8 text-center text-[14px]'}>업무를 불러오는 중...</Text>
  }

  const visibleColumns = isMobile
    ? WORKS_TASK_COLUMNS.filter(column => column.status === activeStatus)
    : WORKS_TASK_COLUMNS

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
              <Text className={'text-[14px] font-semibold'}>미팅 & 개인</Text>
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
              items={WORKS_TASK_COLUMNS.map(({ status, label }) => ({
                status,
                label,
                count: columns[status]?.length ?? 0,
              }))}
              activeStatus={activeStatus}
              onChange={status => setActiveStatus(status as TaskStatusType)}
            />
            <WorksMobileStatusDropRow items={WORKS_TASK_COLUMNS} activeStatus={activeStatus} isDragging={isDragging} />
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
              isConference={false}
              onEditTask={setEditingTask}
              variant={variant}
              onCreate={status === 'READY' ? openCreate : undefined}
              createLabel={'업무 만들기'}
            >
              {!isMobile && (
                <div className={'flex items-center justify-between gap-2 px-0.5'}>
                  <h4 className={'text-[16px] font-bold md:text-[18px]'}>
                    {label}
                    <span className={'text-subtle-foreground ml-1.5 text-[13px] font-medium'}>
                      {columns[status]?.length ?? 0}
                    </span>
                  </h4>
                  {status === 'READY' && (
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
