import { Input, P } from '@/shared/ui'

export const RegistForm = () => {
  return (
    <form id={'login-form'} action="" className={'flex w-[400px] flex-col gap-[20px]'}>
      <Input type={'text'} placeholder={'이름'} />
      <div>
        <Input type={'text'} className={'w-full'} placeholder={'이메일'} />
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
  )
}
