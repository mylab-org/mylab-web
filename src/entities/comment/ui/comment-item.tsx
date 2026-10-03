import { Clock, CornerDownRight, Trash } from 'lucide-react'
import { cn } from '@/shared/lib'
import { formatRelativeDate } from '@/shared/lib/format'
import { Avatar } from '@/shared/ui/override/avatar'
import { Text } from '@/shared/ui/override/text'
import type { CommentType } from '../model/types'
import type { ReactNode } from 'react'

type Props = {
  isWriter: boolean
  comment: CommentType
  replyFn?: () => void
  /** 수정 모드 진입/취소 토글 */
  updateFn?: () => void
  isEditing?: boolean
  /** 수정 모드일 때 댓글 내용 자리에 렌더할 폼 */
  updateForm?: ReactNode
  deleteFn?: () => void
  isDeletePending?: boolean
}

export const CommentItem = ({
  isWriter,
  comment,
  replyFn,
  updateFn,
  isEditing = false,
  updateForm,
  deleteFn,
  isDeletePending,
}: Props) => {
  return (
    <div className={'flex flex-col gap-1 py-1.25'}>
      {comment.author.name && (
        <div className={'flex items-center justify-between'}>
          <div className={'flex items-center gap-1.25'}>
            <Avatar
              src={'/test.png'}
              alt={'profile'}
              width={16}
              height={16}
              className={'gap-1.25'}
              imgClassName={'rounded-full h-4 w-4 lg:h-5 lg:w-5'}
            >
              <Text
                className={cn('text-[12px] font-bold lg:text-[14px]', isWriter ? 'text-[#2c8bed]' : 'text-slate-600')}
              >
                {comment.author.name}
              </Text>
            </Avatar>
            <Text className={'text-[10px] font-medium text-slate-400 lg:text-[12px]'}>{comment.author.labName}</Text>
          </div>
          <div className={'flex items-center gap-1.25'}>
            <button type="button" onClick={updateFn} className="flex cursor-pointer items-center gap-1.25">
              <Text className={'text-[12px] text-gray-400 lg:text-[12px]'}>수정</Text>
            </button>
            <button
              type="button"
              onClick={deleteFn}
              disabled={isDeletePending}
              className="flex cursor-pointer items-center gap-1.25"
            >
              <Trash className="text-gray-400" size={14} />
              <Text className={'text-[12px] text-gray-400 lg:text-[12px]'}>삭제</Text>
            </button>
          </div>
        </div>
      )}
      <div className={'flex flex-col gap-2.5'}>
        {isEditing ? (
          updateForm
        ) : (
          <Text className={'py-2 text-[12px] font-normal lg:text-[14px]'}>{comment.content}</Text>
        )}
        <div className={cn('flex items-center gap-2', comment.author.name !== '' ? 'justify-between' : 'justify-end')}>
          {comment.author.name !== '' && (
            <button type="button" onClick={replyFn} className="flex cursor-pointer items-center gap-1">
              <CornerDownRight className="text-gray-400" size={14} />
              <Text className={'text-[10px] text-gray-400 lg:text-[12px]'}>댓글 달기</Text>
            </button>
          )}
          <div className={'flex items-center gap-1.25'}>
            <Clock className="text-gray-400" size={14} />
            <Text className={'text-[10px] font-medium text-slate-400 lg:text-[12px]'}>
              {formatRelativeDate(comment.createdAt)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
