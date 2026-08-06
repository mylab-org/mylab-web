import { Button } from '@/shared/ui/override/button'
import { Input } from '@/shared/ui/override/input'

export const MoreUserPw = () => {
  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 px-5 lg:w-[550px] lg:px-7.5'}>
      <div className={'flex flex-col items-center gap-5 py-5'}>
        <Input placeholder={'현재 비밀번호'} className={'w-full'} />
        <Input placeholder={'새 비밀번호'} className={'w-full'} />
        <Input placeholder={'새 비밀번호 확인'} className={'w-full'} />
      </div>
      <Button className={'mt-7.5 text-[12px]! md:text-[16px]!'}>비밀번호 변경하기</Button>
    </div>
  )
}
