import { Image } from 'next/dist/client/image-component'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Text } from '@/shared/ui/text'

export const MoreUserUpdate = () => {
  return (
    <div
      className={
        'flex min-h-0 w-full flex-1 flex-col gap-[10px] overflow-auto px-[20px] pb-[20px] lg:w-[550px] lg:px-[30px]'
      }
    >
      <div className={'flex flex-col items-center gap-[10px] py-[10px]'}>
        <div className={'h-[80px] w-[80px] rounded-full bg-gray-300 md:h-[120px] md:w-[120px]'}></div>
        <div className={'w-full'}>
          <Text className={'text-[14px] text-gray-600!'}>이름</Text>
          <Input placeholder={'이름'} className={'w-full'} />
        </div>
        <div className={'w-full'}>
          <Text className={'text-[14px] text-gray-600!'}>이메일</Text>
          <Input placeholder={'이메일'} className={'w-full'} />
        </div>
        <div className={'flex w-full items-center justify-between'}>
          <Text className={'text-[14px] text-gray-600!'}>학위</Text>
          <div className={'flex gap-[20px] rounded-[12px] bg-gray-100 px-[12px] py-[2px]'}>
            <Text className={'text-[14px] font-medium md:text-[18px]'}>박사</Text>
            <Image src={'/icon/icon_common_drop.svg'} alt={''} width={10} height={5} />
          </div>
        </div>
      </div>
      <Button className={'mt-[30px] text-[12px]! md:text-[16px]!'}>회원정보 수정하기</Button>
    </div>
  )
}
