import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'
import TimePicker from '@/widgets/lab/ui/side/TimePicker'

export const SideRentalTime = () => {
  return (
    <div className={'flex flex-1 flex-col'}>
      <div className={'flex w-full items-center justify-center lg:py-[20px]'}>
        <div
          className={
            'flex flex-1 flex-col items-center justify-center gap-[5px] border-b-4 border-b-gray-600 pt-[10px] pb-[10px] lg:pb-[20px]'
          }
        >
          <Text className={'text-[14px] font-bold lg:text-[18px]'}>대여 일시</Text>
          <Text className={'text-[16px] font-medium text-gray-600! lg:text-[24px]'}>02/07 (토) 02:40</Text>
        </div>
        <div className={'flex flex-1 flex-col items-center justify-center gap-[5px] pt-[10px] pb-[10px] lg:pb-[20px]'}>
          <Text className={'text-[14px] font-bold lg:text-[18px]'}>반납 일시</Text>
          <Text className={'text-[16px] font-medium text-gray-600! lg:text-[24px]'}>02/07 (토) 02:40</Text>
        </div>
      </div>
      <div className={'flex flex-1 items-center justify-center gap-[40px] p-[10px]'}>
        <TimePicker />
      </div>
      <Button className={'mt-[10px] mb-[20px] bg-blue-500!'}>총 2시간 대여</Button>
    </div>
  )
}
