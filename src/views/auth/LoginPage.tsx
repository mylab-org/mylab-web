import { LoginForm } from '@/features/auth/login'
import { Button, LinkText, P } from '@/shared/ui'

export const LoginPage = () => {
  return (
    <div className={'flex flex-col gap-[20px]'}>
      <LoginForm />
      <Button form={'login-form'} variant={'primary'}>
        로그인
      </Button>
      <footer>
        <div>
          <P className={'text-[12px]'}>MyLab이 처음이신가요?</P>
          <LinkText href={'/regist'} className={'text-[12px]'}>
            회원가입하러 가기
          </LinkText>
        </div>
        <div>
          <P className={'text-[12px]'}>비밀번호를 잊으셨나요?</P>
          <LinkText href={'#'} className={'text-[12px]'}>
            비밀번호 재설정하기
          </LinkText>
        </div>
      </footer>
    </div>
  )
}
