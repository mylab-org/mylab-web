import { Image } from 'lucide-react'
import { Button } from '@/shared/ui/override/button'
import { Input } from '@/shared/ui/override/input'
import { Text } from '@/shared/ui/override/text'

export const SideManagementPost = () => {
  return (
    <div className={'flex flex-1 flex-col'}>
      <form action="" className={'flex flex-col gap-2.5 py-5'}>
        <Input placeholder={'비품 이름'} />
        <div
          className={
            'border-border bg-muted flex h-[165px] flex-col items-center justify-center gap-2.5 rounded-[16px] border-2'
          }
        >
          <Image className={'text-muted-foreground h-7 w-7'} />
          <Text className={'text-muted-foreground! text-[14px] font-semibold lg:text-[18px]'}>
            이곳을 클릭하거나 픔목 사진을 드래그해 놓으세요
          </Text>
        </div>
      </form>
      <Button className={'mt-2.5 mb-5'}>대여 품목 등록</Button>
    </div>
  )
}
