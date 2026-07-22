import { Textarea } from '@/shared/ui/override/textarea'
import { Text } from '@/shared/ui/text'

export const WorkChatForm = () => {
  return (
    <form className={'flex flex-col gap-2.5 bg-[#FAFAFA] p-2.5'}>
      <Text className={'text-[12px] font-semibold text-gray-600! md:text-[14px]'}>홍길동</Text>
      <Textarea
        className={'h-20 border border-gray-400 bg-white p-1.25 text-[12px] md:text-[14px]'}
        placeholder={'참여자들과 의견을 나누어보세요'}
      />
    </form>
  )
}
