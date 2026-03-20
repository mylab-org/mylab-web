import { Text } from '@/shared/ui/text'

interface ChatItemProps {
  isMy: boolean
}

export const ChatItem = ({ isMy }: ChatItemProps) => {
  return isMy ? (
    <div className={'flex justify-end'}>
      <Text className={'w-fit max-w-[90%] rounded-[12px] bg-blue-100 p-[10px] text-[12px] font-medium md:text-[14px]'}>
        참여자들과 의견을 나누어보세요 참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을
        나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과
        의견을 나누어보세요
      </Text>
    </div>
  ) : (
    <div className={'flex flex-col gap-[4px]'}>
      <div className={'flex items-center gap-[10px]'}>
        <div className={'h-[24px] w-[24px] rounded-full bg-gray-200'} />
        <Text className={'text-[12px] font-semibold md:text-[14px]'}>홍길동</Text>
      </div>
      <Text className={'w-fit max-w-[90%] rounded-[12px] bg-slate-100 p-[10px] text-[12px] font-medium md:text-[14px]'}>
        참여자들과 의견을 나누어보세요
      </Text>
    </div>
  )
}
