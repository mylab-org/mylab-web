'use client'

import { NewLoginForm } from '@/features/auth/login'
import { AuthLinkItem } from '@/widgets/auth'

const MyLabLoginPage = () => {
  return (
    <>
      <NewLoginForm />
      <footer className={'mt-3'}>
        <AuthLinkItem title={'회원가입하러 가기'} text={'MyLab이 처음이신가요?'} href={'/signup'} />
        <AuthLinkItem title={'비밀번호 재설정하기'} text={'비밀번호를 잊으셨나요?'} href={'#'} />
      </footer>
    </>
  )
}

export default MyLabLoginPage
