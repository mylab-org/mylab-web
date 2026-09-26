import { formatDateTime } from '@/shared/lib/format'
import { Avatar } from '@/shared/ui/override/avatar'
import { Text } from '@/shared/ui/override/text'

type Props = {
  commentCount?: number
  likeCount?: number
  createdAt?: string
  updateFn?: () => void
  deleteFn?: () => void
  isDeletePending?: boolean
}

export const BoardContentMenu = ({
  commentCount = 0,
  likeCount = 0,
  createdAt,
  updateFn,
  deleteFn,
  isDeletePending,
}: Props) => {
  return (
    <div className={'flex items-center justify-between py-2.5'}>
      <div className={'flex gap-2.5 lg:gap-5'}>
        <button type="button" className={'flex cursor-pointer items-center gap-1.25'}>
          <Avatar
            src={'/icon/icon_board_notlike.svg'}
            alt={''}
            width={20}
            height={20}
            imgClassName={'h-4 w-4 lg:h-5 lg:w-5'}
          >
            <Text className={'text-[12px] text-slate-400 lg:text-[16px]'}>{likeCount}</Text>
          </Avatar>
        </button>
        <button type="button" className={'flex cursor-pointer items-center gap-1.25'}>
          <Avatar
            src={'/icon/icon_board_comment.svg'}
            alt={''}
            width={20}
            height={20}
            imgClassName={'h-4 w-4 lg:h-5 lg:w-5'}
          >
            <Text className={'text-[12px] text-slate-400 lg:text-[16px]'}>{commentCount}</Text>
          </Avatar>
        </button>
        <button type="button" onClick={updateFn} className={'flex cursor-pointer items-center gap-1.25'}>
          <Avatar
            src={'/icon/icon_board_update.svg'}
            alt={''}
            width={20}
            height={20}
            imgClassName={'h-4 w-4 lg:h-5 lg:w-5'}
          >
            <Text className={'text-[12px] text-slate-400 lg:text-[16px]'}>수정</Text>
          </Avatar>
        </button>
        <button
          onClick={deleteFn}
          disabled={isDeletePending}
          type="button"
          className={'flex cursor-pointer items-center gap-1.25'}
        >
          <Avatar
            src={'/icon/icon_board_delete.svg'}
            alt={''}
            width={20}
            height={20}
            imgClassName={'h-4 w-4 lg:h-5 lg:w-5'}
          >
            <Text className={'text-[12px] text-slate-400 lg:text-[16px]'}>삭제</Text>
          </Avatar>
        </button>
      </div>
      {createdAt && (
        <Text className={'text-[10px] font-medium text-gray-400 lg:text-[14px]'}>{formatDateTime(createdAt)}</Text>
      )}
    </div>
  )
}
