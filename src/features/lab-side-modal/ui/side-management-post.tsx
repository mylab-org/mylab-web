import { Image } from 'next/dist/client/image-component'
import { Button, Input, Text } from '@/shared/ui'

export const SideManagementPost = () => {
  return (
    <div className={'flex flex-1 flex-col'}>
      <form action="" className={'flex flex-col gap-[10px] py-[20px]'}>
        <Input placeholder={'비품 이름'} />
        <div
          className={
            'bg-gray100 border-gray300 flex h-[165px] flex-col items-center justify-center gap-[10px] rounded-[16px] border border-4 border-dotted'
          }
        >
          <Image src={'/icon/icon_main_img.svg'} alt={''} width={30} height={30} />
          <Text className={'text-gray400! text-[14px] font-semibold lg:text-[18px]'}>
            이곳을 클릭하거나 픔목 사진을 드래그해 놓으세요
          </Text>
        </div>
      </form>
      <Button className={'mt-[10px] mb-[20px]'}>대여 품목 등록</Button>
    </div>
  )
}
