import { Avatar } from '@/shared/ui/override/avatar'
import { Text } from '@/shared/ui/override/text'

export const LabRequestItem = ({ isCheck = false }: { isCheck?: boolean }) => {
  return (
    <div className={'flex items-start gap-2.5 py-2.5'}>
      {isCheck && <input type="checkbox" />}
      <div className={'flex min-w-0 flex-1 flex-col gap-1.25'}>
        <div className={'flex items-start justify-between'}>
          <Text className={'text-[14px] font-medium lg:text-[18px]'}>로지텍 마우스</Text>
          <Text className={'text-[14px] font-bold lg:text-[18px]'}>1개</Text>
        </div>
        <Text className={'text-[14px] font-bold lg:text-[18px]'}>{Number(30000).toLocaleString()} 원</Text>
        <Avatar src={'/icon/link.svg'} alt={'link'} width={16} height={16}>
          <Text className={'min-w-0 truncate text-[12px] font-normal text-gray-500 lg:text-[14px]'}>
            https://prod.danawa.com/info/?pcode=11317038&keyword=%EB%A1%9C%EC%A7%80%ED%85%8D+%EB%A7%88%EC%9A%B0%EC%8A%A4&cate=112787
          </Text>
        </Avatar>
        <div className={'flex items-center justify-between text-[10px] lg:text-[14px]'}>
          <Text className={'text-[#1a1a1a]!'}>2025.12.04(수) 12:31</Text>
          <Avatar src={'/test.png'} alt={'profile'} width={20} height={20} imgClassName={'rounded-full'}>
            <Text className={'text-[#1a1a1a]!'}>김교수</Text>
          </Avatar>
        </div>
      </div>
    </div>
  )
}
