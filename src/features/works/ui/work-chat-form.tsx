import { Text } from '@/shared/ui/override/text'
import { Textarea } from '@/shared/ui/override/textarea'

export const WorkChatForm = () => {
  return (
    <form className={'bg-muted flex flex-col gap-2.5 p-2.5'}>
      <Text className={'text-muted-foreground! text-[12px] font-semibold md:text-[14px]'}>홍길동</Text>
      <Textarea
        className={'border-border bg-card h-20 border p-1.25 text-[12px] md:text-[14px]'}
        placeholder={'참여자들과 의견을 나누어보세요'}
      />
    </form>
  )
}
