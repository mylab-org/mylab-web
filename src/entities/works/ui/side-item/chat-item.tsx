import { Avatar } from '@/shared/ui/override/avatar'
import { Text } from '@/shared/ui/text'

interface ChatItemProps {
  isMy: boolean
}

export const ChatItem = ({ isMy }: ChatItemProps) => {
  return isMy ? (
    <div className={'flex justify-end'}>
      <Text className={'w-fit max-w-[90%] rounded-[12px] bg-blue-100 p-2.5 text-[12px] font-medium md:text-[14px]'}>
        참여자들과 의견을 나누어보세요 참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을
        나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과
        의견을 나누어보세요
      </Text>
    </div>
  ) : (
    <div className={'flex flex-col gap-2'}>
      <Avatar src={'/test.png'} alt={'profile'} width={24} height={24} imgClassName={'rounded-full'}>
        <Text className={'text-[12px] font-semibold md:text-[14px]'}>홍길동</Text>
      </Avatar>
      <Text className={'w-fit max-w-[90%] rounded-[12px] bg-slate-100 p-2.5 text-[12px] font-medium md:text-[14px]'}>
        참여자들과 의견을 나누어보세요
      </Text>
    </div>
  )
}
