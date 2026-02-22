import { Text } from '@/shared/ui'

export const BoardListItem = () => {
  return (
    <li className={'gap-[5px] rounded-[12px] bg-white p-[20px]'}>
      <div className={'flex flex-col gap-[3px]'}>
        <Text className={'text-[16px] font-medium'}>금주 미팅 안내드립니다.</Text>
        <Text className={'text-[14px] font-normal'}>이번주 미팅 없어염</Text>
      </div>
      <div className={'flex items-center justify-between'}>
        <Text className={'text-[14px] font-light text-[#6B6B6B]!'}>2025.12.04(수) 12:31</Text>
        <Text className={'text-[14px] font-normal text-[#6B6B6B]!'}>김교수</Text>
      </div>
    </li>
  )
}
