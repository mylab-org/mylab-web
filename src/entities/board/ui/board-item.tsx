import { Avatar } from '@/shared/ui/override/avatar'
import { Text } from '@/shared/ui/override/text'
import type { PostType } from '../model/types'

type Props = {
  post: PostType
}

export const BoardItem = ({ post }: Props) => {
  return (
    <div className={'flex flex-col gap-1'}>
      <h4 className={'text-[16px] font-bold lg:text-[18px]'}>{post.title}</h4>
      <Avatar
        src={'/test.png'}
        alt={'profile'}
        width={16}
        height={16}
        className={'gap-1.25'}
        imgClassName={'rounded-full h-4 w-4 lg:h-5 lg:w-5'}
      >
        <Text className={'text-[10px] font-medium text-gray-400! lg:text-[12px]'}>
          {post.author.name} 님이 남긴 글 · {post.lab.name}
        </Text>
      </Avatar>

      <Text className={'mt-2 min-h-[50px] text-[12px] font-normal whitespace-pre-wrap lg:text-[14px]'}>
        {post.content}
      </Text>
    </div>
  )
}
