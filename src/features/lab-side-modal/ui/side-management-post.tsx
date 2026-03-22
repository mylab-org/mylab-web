import { Image } from 'next/dist/client/image-component'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'

export const SideManagementPost = () => {
  return (
    <div className={'flex flex-1 flex-col'}>
      <form action="" className={'flex flex-col gap-2.5 py-5'}>
        <Input placeholder={'비품 이름'} />
        <div
          className={
            'flex h-[165px] flex-col items-center justify-center gap-2.5 rounded-[16px] border-4 border-dotted border-gray-300 bg-gray-100'
          }
        >
          <Image src={'/icon/icon_main_img.svg'} alt={''} width={30} height={30} />
          <Text className={'text-[14px] font-semibold text-gray-400! lg:text-[18px]'}>
            이곳을 클릭하거나 픔목 사진을 드래그해 놓으세요
          </Text>
        </div>
      </form>
      <Button className={'mt-2.5 mb-5'}>대여 품목 등록</Button>
    </div>
  )
}
