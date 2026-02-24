import { Text } from '@/shared/ui'

const SideManagementItem = () => {
  return (
    <div className={'flex items-start gap-[10px] py-[10px]'}>
      <input type="checkbox" />
      <div className={'flex flex-1 gap-[10px]'}>
        <div className={'h-[100px] w-[100px] rounded-[10px] bg-gray-200 p-[10px]'} />
        <div className={'flex flex-1 items-start justify-between px-[10px]'}>
          <Text className={'text-[24px] font-bold'}>공용 모니터</Text>
          <div className={'flex items-center gap-[10px]'}>
            <Text className={'text-[16px] font-bold text-gray-500!'}>대여 활성화</Text>
            <Text className={'text-[24px] font-bold'}>공용 모니터</Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SideManagenemtList = () => {
  return (
    <div className={'border-t-gray300 flex flex-col gap-[15px] border-t py-[10px]'}>
      <div className={'flex items-center justify-between'}>
        <div className={'flex items-center gap-[12px]'}>
          <input type="checkbox" />
          <Text className={'text-[18px]'}>전체</Text>
        </div>
        <Text className={'text-[18px] font-bold'}>삭제</Text>
      </div>
      <div className={'flex flex-col gap-[15px]'}>
        <SideManagementItem />
      </div>
    </div>
  )
}
