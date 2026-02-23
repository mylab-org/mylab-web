import { Text } from '@/shared/ui'

export const SideManagement = () => {
  return (
    <div className={'flex w-full flex-1 flex-col gap-[10px] lg:w-[700px]'}>
      <div className={'flex items-center justify-between'}>
        <div className={'flex'}>
          <button className={'font-pretendard bg-gray100 rounded-[10px] px-[15px] py-[10px] text-[18px] font-semibold'}>
            대여 목록 관리
          </button>
          <button
            className={'font-pretendard text-gray400! rounded-[10px] px-[15px] py-[10px] text-[18px] font-semibold'}
          >
            비품 신청 내역
          </button>
        </div>
        <Text className={'text-gray400! text-[18px] font-semibold'}>비품 추가하기</Text>
      </div>
      <div className={'border-t-gray300 flex flex-col gap-[15px] border-t py-[10px]'}>
        <div className={'flex items-center justify-between'}>
          <div className={'flex items-center gap-[12px]'}>
            <input type="checkbox" />
            <Text className={'text-[18px]'}>전체</Text>
          </div>
          <Text className={'text-[18px] font-bold'}>삭제</Text>
        </div>
        <div className={'flex flex-col gap-[15px]'}>
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
        </div>
      </div>
    </div>
  )
}
