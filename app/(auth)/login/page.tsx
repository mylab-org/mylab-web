import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { LinkText } from '@/shared/ui/link-text'
import { P } from '@/shared/ui/p'

const LoginPage = () => {
  return (
    <div className={'flex flex-col gap-[20px]'}>
      <form id={'login-form'} action="" className={'flex w-[400px] flex-col'}>
        <Input className={'!border-b-error'} type={'text'} placeholder={'아이디 또는 전화번호'} />
        <P className={'!text-error text-[12px]'}>아이디 또는 전화번호를 다시 확인해주세요.</P>
        <Input className={'!border-b-error'} type={'password'} placeholder={'비밀번호'} />
        <P className={'!text-error text-[12px]'}>비밀번호를 다시 확인해주세요.</P>
      </form>
      <Button form={'login-form'} variant={'noActive'}>
        로그인
      </Button>
      <div>
        <div>
          <P className={'text-[12px]'}>MyLab이 처음이신가요?</P>
          <LinkText href={'/regist'} className={'text-[12px]'}>
            회원가입하러 가기
          </LinkText>
        </div>
        <div>
          <P className={'text-[12px]'}>아이디를 잊으셨나요?</P>
          <LinkText href={'#'} className={'text-[12px]'}>
            아이디 찾기
          </LinkText>
        </div>
        <div>
          <P className={'text-[12px]'}>비밀번호를 잊으셨나요?</P>
          <LinkText href={'#'} className={'text-[12px]'}>
            비밀번호 재설정하기
          </LinkText>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
