'use client'

import { useQuery } from '@tanstack/react-query'
import { MessageCircle, ThumbsUp } from 'lucide-react'
import { getBoardDetail } from '@/entities/board/api/get-board-detail'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { formatDateTime } from '@/shared/lib/format'
import { Avatar } from '@/shared/ui/override/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/override/dialog'
import { Text } from '@/shared/ui/override/text'

type Props = {
  open: boolean
  postId: number | null
  categoryName?: string
  onOpenChange: (open: boolean) => void
}

const formatSafeDateTime = (value?: string) => {
  if (!value) return null
  try {
    return formatDateTime(value)
  } catch {
    return null
  }
}

export const MoreUserPostDetailModal = ({ open, postId, categoryName, onOpenChange }: Props) => {
  const {
    data: post,
    isPending,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.BOARD.DETAIL(postId ?? 0),
    queryFn: () => getBoardDetail(postId as number),
    enabled: open && postId !== null,
  })

  const createdAtLabel = formatSafeDateTime(post?.createdAt)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className={'flex max-h-[85vh] flex-col sm:max-w-[560px]'}>
        <DialogHeader className={'shrink-0'}>
          <DialogTitle className={'pr-8 text-left'}>{post?.title ?? '게시글 상세'}</DialogTitle>
          <DialogDescription className={'sr-only'}>작성한 게시글 상세 내용입니다.</DialogDescription>
        </DialogHeader>

        <div className={'flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto'}>
          {isPending && <Text className={'text-subtle-foreground! text-[13px]'}>불러오는 중...</Text>}
          {isError && <Text className={'text-error! text-[13px]'}>게시글을 불러오지 못했습니다.</Text>}
          {post && (
            <>
              <div className={'flex flex-wrap items-center gap-x-2 gap-y-1'}>
                {categoryName && <Text className={'text-brand! text-[12px] font-semibold'}>{categoryName}</Text>}
                {createdAtLabel && <Text className={'text-subtle-foreground! text-[12px]'}>{createdAtLabel}</Text>}
              </div>

              <Avatar
                src={'/test.png'}
                alt={'profile'}
                width={16}
                height={16}
                className={'gap-1.25'}
                imgClassName={'h-4 w-4 rounded-full lg:h-5 lg:w-5'}
              >
                <Text className={'text-[10px] font-medium text-gray-400! lg:text-[12px]'}>
                  {post.author.name} 님이 남긴 글 {!post.isAnonymous && `· ${post.author.labName}`}
                </Text>
              </Avatar>

              <Text className={'text-foreground! text-[14px] leading-6 font-normal whitespace-pre-wrap md:text-[15px]'}>
                {post.content}
              </Text>

              <div
                className={'text-subtle-foreground! border-border flex items-center gap-4 border-t pt-3 text-[12px]'}
              >
                <span className={'flex items-center gap-1'}>
                  <ThumbsUp className={'h-3.5 w-3.5'} />
                  좋아요 {post.likeCount}
                </span>
                <span className={'flex items-center gap-1'}>
                  <MessageCircle className={'h-3.5 w-3.5'} />
                  댓글 {post.commentCount}
                </span>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
