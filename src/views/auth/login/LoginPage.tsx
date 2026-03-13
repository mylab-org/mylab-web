import { LoginForm } from '@/features/auth/login'
import { AuthLinkItem } from '@/widgets/auth'

export const LoginPage = () => {
  return (
    <div className={'flex flex-col gap-[20px]'}>
      <LoginForm />
      <footer>
        <AuthLinkItem title={'회원가입하러 가기'} text={'MyLab이 처음이신가요?'} href={'/signup'} />
        <AuthLinkItem title={'비밀번호 재설정하기'} text={'비밀번호를 잊으셨나요?'} href={'#'} />
      </footer>
    </div>
  )
}
