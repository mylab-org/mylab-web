import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

export const SideRequestPost = () => {
  return (
    <div className={'flex flex-1 flex-col'}>
      <form action="" className={'flex flex-1 flex-col gap-[10px] py-[20px]'}>
        <Input placeholder={'비품 이름'} />
        <div className={'flex flex-1 items-center gap-[20px]'}>
          <Input placeholder={'가격'} className={'w-full'} />
          <Input placeholder={'개수'} className={'w-full'} />
        </div>
        <Input placeholder={'구매 링크'} />
      </form>
      <Button className={'mt-[10px] mb-[20px]'}>비품 신청하기</Button>
    </div>
  )
}
