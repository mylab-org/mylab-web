import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import { MobileAuthHeader } from '@/widgets/header'

export const MobileEmailValidatePage = () => {
  return (
    <>
      <MobileAuthHeader />
      <div className={'flex flex-1 flex-col gap-7.5 px-7.5 pb-5'}>
        <h1 className={'text-[22px] font-bold'}>인증메일 발송</h1>
        <div className={'flex h-full w-full flex-col gap-5'}>
          <Text className={'text-[24px] font-bold whitespace-pre-wrap'}>{'김땡땡 님,\n이메일을 확인해주세요'}</Text>
          <Text className={'text-[14px] font-semibold whitespace-pre-wrap'}>{'인증 메일이 발송되었습니다.'}</Text>
        </div>
        <Button.Link
          href={'/login'}
          target={'_self'}
          color={'main'}
          icon={
            <svg
              className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          }
          iconPosition={'after'}
        >
          처음으로
        </Button.Link>
      </div>
    </>
  )
}
