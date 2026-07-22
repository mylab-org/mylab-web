import { Button } from '@/shared/ui/override/button'
import { Input } from '@/shared/ui/override/input/input'
import { Text } from '@/shared/ui/text/Text'

const AuthSearch = () => {
  return (
    <div className={'flex flex-col gap-[20px]'}>
      <Text className={'text-[32px] font-semibold'}>비밀번호 재설정하기</Text>
      <form id={'search-pw-form'} action="" className={'flex w-[400px] flex-col gap-[20px]'}>
        <div>
          <div className={'flex gap-[6px]'}>
            <Input type={'text'} className={'flex-1'} placeholder={'전화번호'} />
            <Button className={'w-fit'}>인증</Button>
          </div>
          <Text className={'text-error text-[12px]'}>이미 사용 중인 전화번호입니다</Text>
        </div>
        <div>
          <div className={'flex gap-[6px]'}>
            <Input type={'text'} className={'flex-1'} placeholder={'인증번호'} />
            <Button className={'w-fit'}>확인</Button>
          </div>
          <Text className={'text-error text-[12px]'}>이미 사용 중인 전화번호입니다</Text>
        </div>
      </form>
      <Button form={'search-pw-form'}>비밀번호 재설정하기</Button>
      <div className={'flex flex-col'}>
        <Text className={'text-[12px]'}>아이디를 잊으셨나요?</Text>
        <Button.Link href={'/login'} className={'text-[12px] text-blue-400'}>
          아이디 찾기
        </Button.Link>
      </div>
    </div>
  )
}

export default AuthSearch
