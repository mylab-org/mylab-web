import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { LinkText } from '@/shared/ui/link-text'
import { P } from '@/shared/ui/p'

const RegistPage = () => {
  return (
    <div className={'flex flex-col gap-[20px]'}>
      <form id={'login-form'} action="" className={'flex w-[400px] flex-col gap-[20px]'}>
        <Input type={'text'} placeholder={'이름'} />
        <div>
          <div className={'flex gap-[6px]'}>
            <Input type={'text'} className={'flex-1'} placeholder={'전화번호'} />
            <Button variant={'noActive'} className={'w-fit'}>
              인증
            </Button>
          </div>
          <P className={'!text-error text-[12px]'}>이미 사용 중인 전화번호입니다</P>
        </div>
        <div>
          <div className={'flex gap-[6px]'}>
            <Input type={'text'} className={'flex-1'} placeholder={'인증번호'} />
            <Button variant={'noActive'} className={'w-fit'}>
              확인
            </Button>
          </div>
          <P className={'!text-error text-[12px]'}>인증번호를 다시 확인해주세요</P>
        </div>
        <div>
          <Input type={'text'} className={'w-full'} placeholder={'아이디'} />
          <P className={'!text-error text-[12px]'}>이미 사용 중인 아이디입니다</P>
        </div>
        <div>
          <Input type={'password'} className={'w-full'} placeholder={'비밀번호'} />
          <P className={'!text-error text-[12px]'}>비밀번호는 8자 이상이어야 합니다</P>
        </div>
        <div>
          <Input type={'password'} className={'w-full'} placeholder={'비밀번호 확인'} />
          <P className={'!text-error text-[12px]'}>비밀번호가 일치하지 않습니다</P>
        </div>
      </form>
      <Button form={'login-form'} variant={'noActive'}>
        가입하기
      </Button>
      <div>
        <div>
          <P className={'text-[12px]'}>이미 계정이 있으신가요?</P>
          <LinkText href={'/login'} className={'text-[12px]'}>
            로그인하러 가기
          </LinkText>
        </div>
      </div>
    </div>
  )
}

export default RegistPage
