import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { LinkText } from '@/shared/ui/link-text'
import { P } from '@/shared/ui/p'

const LoginPage = () => {
  return (
    <div className={'flex flex-col items-center justify-center gap-[30px]'}>
      <h1 className={'font-pret endard text-gray900 text-[48px] font-extrabold'}>MyLab</h1>
      <div className={'flex flex-col gap-[20px]'}>
        <form id={'login-form'} action="" className={'flex flex-col'}>
          <Input placeholder={'아이디 또는 전화번호'} />
          <Input placeholder={'비밀번호'} />
        </form>
        <Button form={'login-form'}>로그인</Button>
        <div>
          <div>
            <P className={'text-[16px]'}>MyLab이 처음이신가요?</P>
            <LinkText href={'#'} className={'text-[16px]'}>
              회원가입하러 가기
            </LinkText>
          </div>
          <div>
            <P className={'text-[16px]'}>아이디를 잊으셨나요?</P>
            <LinkText href={'#'} className={'text-[16px]'}>
              아이디 찾기
            </LinkText>
          </div>
          <div>
            <P className={'text-[16px]'}>비밀번호를 잊으셨나요?</P>
            <LinkText href={'#'} className={'text-[16px]'}>
              비밀번호 재설정하기
            </LinkText>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
