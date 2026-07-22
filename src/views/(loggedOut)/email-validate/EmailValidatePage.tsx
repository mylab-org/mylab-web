import { Text } from '@/shared/ui/text'

export const EmailValidatePage = () => {
  return (
    <div className={'flex w-full flex-col gap-5'}>
      <Text className={'text-[32px] font-bold whitespace-pre-wrap'}>{'김땡땡 님,\n이메일을 확인해주세요'}</Text>
      <Text className={'text-[18px] font-semibold whitespace-pre-wrap'}>{'인증 메일이 발송되었습니다.'}</Text>
    </div>
  )
}
