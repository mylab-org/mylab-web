import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/text'
import { TimePicker } from '@/shared/ui/time-picker'

export const SideRentalTime = () => {
  return (
    <div className={'flex flex-1 flex-col'}>
      <div className={'flex w-full items-center justify-center lg:py-5'}>
        <div
          className={
            'flex flex-1 flex-col items-center justify-center gap-1.25 border-b-4 border-b-gray-600 pt-2.5 pb-2.5 lg:pb-5'
          }
        >
          <Text className={'text-[14px] font-bold lg:text-[18px]'}>대여 일시</Text>
          <Text className={'text-[16px] font-medium text-gray-600! lg:text-[24px]'}>02/07 (토) 02:40</Text>
        </div>
        <div className={'flex flex-1 flex-col items-center justify-center gap-1.25 pt-2.5 pb-2.5 lg:pb-5'}>
          <Text className={'text-[14px] font-bold lg:text-[18px]'}>반납 일시</Text>
          <Text className={'text-[16px] font-medium text-gray-600! lg:text-[24px]'}>02/07 (토) 02:40</Text>
        </div>
      </div>
      <div className={'flex flex-1 items-center justify-center gap-10 p-2.5'}>
        <TimePicker />
      </div>
      <Button className={'mt-2.5 mb-5 bg-blue-500!'}>총 2시간 대여</Button>
    </div>
  )
}
