import { RegistForm } from '@/features/auth/regist'
import { Button, Radio } from '@/shared/ui'
import { AuthLinkItem } from '@/widgets/auth'

export const RegistPage = () => {
  return (
    <div className={'flex flex-col gap-[20px]'}>
      <div className={'flex gap-[20px]'}>
        <Radio id={'survey1'} name={'survey'} title={'교수'} />
        <Radio id={'survey2'} name={'survey'} title={'연구원'} />
      </div>
      <div className={'flex gap-[20px]'}>
        <Radio id={'survey3'} name={'student'} title={'학부생'} />
        <Radio id={'survey4'} name={'student'} title={'석사'} />
        <Radio id={'survey5'} name={'student'} title={'박사'} />
      </div>
      <RegistForm />
      <Button form={'login-form'} variant={'noActive'}>
        가입하기
      </Button>
      <footer>
        <AuthLinkItem title={'로그인하러 가기'} text={'이미 계정이 있으신가요?'} href={'/login'} />
      </footer>
    </div>
  )
}
