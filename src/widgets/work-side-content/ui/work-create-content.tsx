import { useSideModalStore } from '@/shared/store'
import { Input, Text } from '@/shared/ui'
import { Button } from '@/shared/ui/button'
import { Radio } from '@/shared/ui/radio'

export const WorkCreateContent = () => {
  const closeSideModal = useSideModalStore(state => state.closeSideModal)
  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-[10px] px-[20px] lg:w-[750px] lg:px-[30px]'}>
      <form className={'flex flex-col gap-[30px] py-[20px]'}>
        <div className={'flex flex-col gap-[20px]'}>
          <Text className={'text-[16px] font-bold'}>업무 종류</Text>
          <div className={'flex items-center gap-[20px]'}>
            <Radio title={'미팅 준비'} />
            <Radio title={'개인 업무'} />
          </div>
        </div>
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>업무 제목</Text>
          <Input placeholder={'제목'} className={'w-full text-[14px]! font-medium md:text-[18px]!'} />
        </div>
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>업무 설명</Text>
          <Input placeholder={'설명'} className={'w-full text-[14px]! font-medium md:text-[18px]!'} />
        </div>
      </form>
      <Button className={'mb-[20px]'} onClick={closeSideModal}>
        업무 생성하기
      </Button>
    </div>
  )
}
