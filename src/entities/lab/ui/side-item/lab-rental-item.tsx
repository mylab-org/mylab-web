import { Avatar } from '@/shared/ui/override/avatar'
import { Text } from '@/shared/ui/text'

export const LabRentalItem = () => {
  return (
    <div className={'flex gap-2.5 p-2.5'}>
      <div className={'h-[50px] w-[50px] rounded-[10px] bg-gray-200 p-2.5 lg:h-[100px] lg:w-[100px]'} />
      <div className={'flex flex-1 flex-col justify-between gap-2.5 lg:px-2.5 lg:py-1.25'}>
        <div className={'flex flex-1 flex-col gap-2.5'}>
          <Text className={'text-[14px] font-bold lg:text-[24px]'}>공용 모니터</Text>
          <Avatar src={'/test.png'} alt={'profile'} width={20} height={20} imgClassName={'rounded-full'}>
            <Text className={'text-[10px] font-semibold text-gray-500 lg:text-[14px]'}>
              김철수 대여 | 26.01.05 15:00 ~ 26.01.10 13:00
            </Text>
          </Avatar>
        </div>
        <div className={'flex flex-col gap-1'}>
          <div className={'relative flex h-2.5 overflow-hidden rounded-[24px] bg-gray-400'}>
            <div className={'absolute flex h-2.5 w-1/2 rounded-[24px] bg-blue-500'}></div>
            <div className={'absolute left-[80%] flex h-2.5 w-1/3 rounded-[24px] bg-gray-700'}></div>
          </div>
          <div className={'flex items-center justify-between'}>
            <Text className={'text-[8px] font-semibold text-gray-400 lg:text-[14px]'}>01/05</Text>
            <Text className={'text-[8px] font-semibold text-gray-400 lg:text-[14px]'}>12:00</Text>
            <Text className={'text-[8px] font-semibold text-gray-400 lg:text-[14px]'}>01/06</Text>
          </div>
        </div>
      </div>
    </div>
  )
}
