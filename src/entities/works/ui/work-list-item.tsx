import { Text } from '@/shared/ui'

export const WorkListItem = () => {
  return (
    <div className={'flex flex-col gap-[5px]'}>
      <div className={'flex items-center gap-[5px]'}>
        <Text className={'text-[14px] font-bold lg:text-[18px]'}>2025 한국통신학회 동계종합학술발표회</Text>
      </div>
      <div>
        <Text className={'text-[10px] font-normal lg:text-[14px]'}>
          2026.02.04(수)~2026.02.06(금), <b className={'font-bold'}>마감 D-24</b>
        </Text>
        <Text className={'text-[10px] font-normal lg:text-[14px]'}>모나 용평(용평리조트)</Text>
      </div>
    </div>
  )
}
