import { Text } from '@/shared/ui'

export const EmailValidatePage = () => {
  return (
    <div className={'flex w-[400px] flex-col gap-[20px]'}>
      <Text className={'text-[32px] font-semibold whitespace-pre-wrap'}>{'김땡땡 님,\n이메일을 확인해주세요'}</Text>
      <Text className={'text-[14px] font-semibold whitespace-pre-wrap'}>{'인증 메일이 발송되었습니다.'}</Text>
    </div>
  )
}
