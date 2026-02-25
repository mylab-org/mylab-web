import { SideRentalList } from '@/entities/lab-side'
import { Button } from '@/shared/ui'

export const SideRental = () => {
  return (
    <div className={'flex w-full flex-1 flex-col gap-[10px] px-[30px] lg:w-[750px]'}>
      <SideRentalList />
      <Button className={'mb-[20px]'}>대여 시간 변경하기</Button>
    </div>
  )
}
