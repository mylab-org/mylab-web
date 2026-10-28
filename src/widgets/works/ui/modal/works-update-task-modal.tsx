'use client'

import type { TaskListResponseType } from '@/entities/works/model/types'
import { WorksUpdateTaskForm } from '@/features/works'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/override/dialog'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: TaskListResponseType
  onSuccess?: (updatedTask: TaskListResponseType) => void
}

export const WorksUpdateTaskModal = ({ open, onOpenChange, task, onSuccess }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>업무 정보 수정</DialogTitle>
          <DialogDescription className="sr-only">업무 정보를 수정합니다.</DialogDescription>
        </DialogHeader>
        <WorksUpdateTaskForm task={task} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  )
}
