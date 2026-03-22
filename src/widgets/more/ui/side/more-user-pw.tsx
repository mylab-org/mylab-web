import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

export const MoreUserPw = () => {
  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-[10px] px-[20px] lg:w-[550px] lg:px-[30px]'}>
      <div className={'flex flex-col items-center gap-[20px] py-[20px]'}>
        <Input placeholder={'현재 비밀번호'} className={'w-full'} />
        <Input placeholder={'새 비밀번호'} className={'w-full'} />
        <Input placeholder={'새 비밀번호 확인'} className={'w-full'} />
      </div>
      <Button className={'mt-[30px] text-[12px]! md:text-[16px]!'}>비밀번호 변경하기</Button>
    </div>
  )
}
