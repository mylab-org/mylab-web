import clsx from 'clsx'
import { Heart, MessageCircleMore, SquarePen, Trash2 } from 'lucide-react'
import type { PostType } from '@/entities/board/model/types'
import { formatRelativeDate } from '@/shared/lib/format'
import { Text } from '@/shared/ui/override/text'

type Props = {
  post: PostType
  commentFn?: () => void
  updateFn?: () => void
  deleteFn?: () => void
  isDeletePending?: boolean
  likeFn?: () => void
  isLikePending?: boolean
}

export const BoardItemNav = ({
  post,
  commentFn,
  updateFn,
  deleteFn,
  isDeletePending,
  likeFn,
  isLikePending,
}: Props) => {
  return (
    <div className={'flex items-center justify-between py-2.5'}>
      <div className={'flex gap-4 lg:gap-5'}>
        <button
          type="button"
          onClick={likeFn}
          disabled={isLikePending}
          className={'flex cursor-pointer items-center gap-1.25'}
        >
          <Heart
            className={clsx('h-4 w-4 lg:h-5 lg:w-5', post.isLiked ? 'fill-red-500 text-red-500' : 'text-slate-400')}
          />
          <Text className={'text-[10px] text-slate-400 lg:text-[12px]'}>{post.likeCount}</Text>
        </button>

        <button type="button" onClick={commentFn} className={'flex cursor-pointer items-center gap-1.25'}>
          <MessageCircleMore className={'h-4 w-4 text-slate-400 lg:h-5 lg:w-5'} />
          <Text className={'text-[10px] text-slate-400 lg:text-[12px]'}>{post.commentCount}</Text>
        </button>

        {post.isMine && (
          <>
            <button type="button" onClick={updateFn} className={'flex cursor-pointer items-center gap-1.25'}>
              <SquarePen className={'h-4 w-4 text-slate-400 lg:h-5 lg:w-5'} />
              <Text className={'text-[10px] text-slate-400 lg:text-[12px]'}>수정</Text>
            </button>

            <button
              onClick={deleteFn}
              disabled={isDeletePending}
              type="button"
              className={'flex cursor-pointer items-center gap-1.25'}
            >
              <Trash2 className={'h-4 w-4 text-slate-400 lg:h-5 lg:w-5'} />
              <Text className={'text-[10px] text-slate-400 lg:text-[12px]'}>삭제</Text>
            </button>
          </>
        )}
      </div>
      {post.createdAt && (
        <Text className={'text-[10px] font-medium text-gray-400 lg:text-[12px]'}>
          {formatRelativeDate(post.createdAt)}
        </Text>
      )}
    </div>
  )
}
