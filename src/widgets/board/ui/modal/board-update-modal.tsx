'use client'

import type { PostType } from '@/entities/board/model/types'
import { BoardUpdateForm } from '@/features/board/ui/board-update-form'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/override/dialog'

type Props = {
  open: boolean
  post: PostType | null
  onOpenChange: (open: boolean) => void
}

export const BoardUpdateModal = ({ open, post, onOpenChange }: Props) => {
  if (post === null) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>게시글 수정</DialogTitle>
          <DialogDescription className="sr-only">게시글 제목과 내용을 수정합니다.</DialogDescription>
        </DialogHeader>
        <BoardUpdateForm
          key={post.id}
          postId={Number(post.id)}
          title={post.title}
          content={post.content}
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
