import { Image } from 'next/dist/client/image-component'
import { Text } from '@/shared/ui/text'

export const LabRequestItem = ({ isCheck = false }: { isCheck?: boolean }) => {
  return (
    <div className={'flex items-start gap-[10px] py-[10px]'}>
      {isCheck && <input type="checkbox" />}
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
