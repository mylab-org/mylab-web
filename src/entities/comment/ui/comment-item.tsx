import { Image } from 'next/dist/client/image-component'
import { formatDateTime } from '@/shared/lib/format'
import { Avatar } from '@/shared/ui/override/avatar'
import { Text } from '@/shared/ui/override/text'
import type { CommentItemType } from '../model/types'

type Props = {
  comment: CommentItemType
  labName: string
}

export const CommentItem = ({ comment, labName }: Props) => {
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
              <Text className={'text-[12px] font-bold text-slate-600 lg:text-[14px]'}>{comment.author.name}</Text>
            </Avatar>
            {comment && <Text className={'text-[10px] font-medium text-slate-400 lg:text-[12px]'}>{labName}</Text>}
          </div>
          <button type="button" className="flex cursor-pointer items-center gap-1.25">
            <Image src={'/icon/icon_board_delete.svg'} alt={''} width={12} height={12} />
            <Text className={'text-[12px] text-gray-400 lg:text-[12px]'}>삭제</Text>
          </button>
        </div>
      )}
      <div className={'flex flex-col gap-2.5'}>
        <Text className={'text-[12px] font-normal lg:text-[14px]'}>{comment.content}</Text>
        {comment.created_at && (
          <div className={'flex items-center gap-1.25'}>
            <Image src={'/icon/icon_board_time.svg'} alt={''} width={12} height={12} />
            <Text className={'text-[10px] font-medium text-slate-400 lg:text-[12px]'}>
              {formatDateTime(comment.created_at)}
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}
