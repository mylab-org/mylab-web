import { useSideModalStore } from '@/shared/store'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Radio } from '@/shared/ui/radio'
import { Text } from '@/shared/ui/text'

export const CreateWorkForm = () => {
  const closeSideModal = useSideModalStore(state => state.closeSideModal)

  return (
    <>
      <form className={'flex flex-col gap-7.5 py-5'}>
        <div className={'flex flex-col gap-5'}>
          <Text className={'text-[16px] font-bold'}>업무 종류</Text>
          <div className={'flex items-center gap-5'}>
            <Radio title={'미팅 준비'} />
            <Radio title={'개인 업무'} />
          </div>
        </div>
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>업무 제목</Text>
          <Input placeholder={'제목'} className={'w-full text-[14px] font-medium md:text-[18px]'} />
        </div>
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>업무 설명</Text>
          <Input placeholder={'설명'} className={'w-full text-[14px] font-medium md:text-[18px]'} />
        </div>
      </form>
      <Button className={'mb-5'} onClick={closeSideModal}>
        업무 생성하기
      </Button>
    </>
  )
}
