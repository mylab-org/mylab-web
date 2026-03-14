import { Image } from 'next/dist/client/image-component'
import { Button } from '@/shared/ui/button'
import { CheckBox } from '@/shared/ui/checkbox'
import { Text } from '@/shared/ui/text'

const SidePostItem = () => {
  return (
    <div className={'flex items-start gap-[10px] py-[10px]'}>
      <input type="checkbox" />
      <div className={'flex min-w-0 flex-1 flex-col gap-[5px]'}>
        <div className={'flex items-start justify-between'}>
          <Text className={'text-[14px] font-medium lg:text-[18px]'}>로지텍 마우스</Text>
          <Text className={'text-[14px] font-bold lg:text-[18px]'}>1개</Text>
        </div>
        <Text className={'text-[14px] font-bold lg:text-[18px]'}>{Number(30000).toLocaleString()} 원</Text>
        <div className={'flex min-w-0 items-center gap-[6px]'}>
          <Image src={'/icon/link.svg'} alt={''} width={16} height={16} />
          <Text className={'min-w-0 truncate text-[12px] font-normal text-gray-500! lg:text-[14px]'}>
            https://prod.danawa.com/info/?pcode=11317038&keyword=%EB%A1%9C%EC%A7%80%ED%85%8D+%EB%A7%88%EC%9A%B0%EC%8A%A4&cate=112787
          </Text>
        </div>
        <div className={'flex items-center justify-between text-[10px] lg:text-[14px]'}>
          <Text className={'text-[#1a1a1a]!'}>2025.12.04(수) 12:31</Text>
          <div className={'flex items-center gap-[5px]'}>
            <Image
              src={'/icon_example.png'}
              alt={''}
              width={20}
              height={20}
              className={'h-[20px] w-[20px] rounded-full bg-gray-300'}
            />
            <Text className={'text-[#1a1a1a]!'}>김교수</Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SideRequestList = ({ isBottom }: { isBottom: boolean }) => {
  return (
    <div className={'flex min-h-0 flex-col gap-[15px] border-t border-t-gray-300 pt-[10px]'}>
      <div className={'flex items-center justify-between'}>
        <CheckBox title="전체" />
        <div className={'flex items-center gap-[20px]'}>
          <Button.Menu className="font-bold">승인</Button.Menu>
          <Button.Menu className="font-bold">반려</Button.Menu>
        </div>
      </div>
      <div className={`flex flex-col gap-[15px] ${isBottom ? 'overflow-hidden' : 'overflow-auto'}`}>
        <SidePostItem />
        <SidePostItem />
        <SidePostItem />
        <SidePostItem />
        <SidePostItem />
        <SidePostItem />
        <SidePostItem />
        <SidePostItem />
      </div>
    </div>
  )
}
