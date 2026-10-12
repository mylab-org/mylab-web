'use client'

import type { WorksPaperDetailResponseType } from '@/entities/works/model/types'
import { WorksUpdatePaperForm } from '@/features/works'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/override/dialog'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  paperId: number
  title: string
  onSuccess?: (updatedPaper: WorksPaperDetailResponseType) => void
}

export const WorksUpdatePaperModal = ({ open, onOpenChange, paperId, title, onSuccess }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>논문 정보 수정</DialogTitle>
          <DialogDescription className="sr-only">논문 제목을 수정합니다.</DialogDescription>
        </DialogHeader>
        <WorksUpdatePaperForm paperId={paperId} defaultTitle={title} onSuccess={onSuccess} />
      </DialogContent>
    </Dialog>
  )
}
