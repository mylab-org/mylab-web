import { AUTH_EMAIL_VALIDATE_MESSAGE } from '@/shared/constant/auth'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'

type Props = {
  type: keyof typeof AUTH_EMAIL_VALIDATE_MESSAGE
}

export const AuthEmailValidate = ({ type }: Props) => {
  return (
    <div className={'flex w-full flex-col space-y-10'}>
      <div className={'flex h-full w-full flex-col gap-4'}>
        <Text className={'text-[24px] font-bold whitespace-pre-wrap'}>{AUTH_EMAIL_VALIDATE_MESSAGE[type].TITLE}</Text>
        <Text className={'text-[14px] font-semibold whitespace-pre-wrap'}>
          {AUTH_EMAIL_VALIDATE_MESSAGE[type].DESCRIPTION}
        </Text>
      </div>
      <Button.Link
        href={'/login'}
        target={'_self'}
        color="main"
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
        로그인하러 가기
      </Button.Link>
    </div>
  )
}
