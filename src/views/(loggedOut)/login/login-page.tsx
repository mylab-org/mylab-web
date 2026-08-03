import { LoginForm } from '@/features/login'
import { AuthLinkItem } from '@/shared/ui/template/auth-link-item'

export const LoginPage = () => {
  return (
    <>
      <LoginForm />
      <footer className={'mt-3'}>
        <AuthLinkItem title={'회원가입하러 가기'} text={'MyLab이 처음이신가요?'} href={'/signup'} />
        <AuthLinkItem title={'비밀번호 재설정하기'} text={'비밀번호를 잊으셨나요?'} href={'#'} />
      </footer>
    </>
  )
}
