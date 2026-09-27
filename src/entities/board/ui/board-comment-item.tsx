import { Image } from 'next/dist/client/image-component'
import { Avatar } from '@/shared/ui/override/avatar'
import { Text } from '@/shared/ui/override/text'

type Props = {
  authorName: string
  content: string
  createdAt: string
  labName?: string
}

export const BoardCommentItem = ({ authorName, content, createdAt, labName }: Props) => {
  return (
    <div className={'flex flex-col gap-1 py-1.25'}>
      {authorName && (
        <div className={'flex items-center gap-1.25'}>
          <Avatar
            src={'/test.png'}
            alt={'profile'}
            width={16}
            height={16}
            className={'gap-1.25'}
            imgClassName={'rounded-full h-4 w-4 lg:h-5 lg:w-5'}
          >
            <Text className={'text-[12px] font-bold text-slate-600 lg:text-[14px]'}>{authorName}</Text>
          </Avatar>
          {labName && <Text className={'text-[10px] font-medium text-slate-400 lg:text-[12px]'}>{labName}</Text>}
        </div>
      )}
      <div className={'flex flex-col gap-2.5'}>
        <Text className={'text-[12px] font-normal lg:text-[14px]'}>{content}</Text>
        {createdAt && (
          <div className={'flex items-center gap-1.25'}>
            <Image src={'/icon/icon_board_time.svg'} alt={''} width={12} height={12} />
            <Text className={'text-[10px] font-medium text-slate-400 lg:text-[12px]'}>{createdAt}</Text>
          </div>
        )}
      </div>
    </div>
  )
}
