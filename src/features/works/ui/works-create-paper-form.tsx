import { useSideModalStore } from '@/shared/store'
import { Button } from '@/shared/ui/override/button'
import { Input } from '@/shared/ui/override/input'
import { Text } from '@/shared/ui/override/text'

export const WorksCreatePaperForm = () => {
  const closeSideModal = useSideModalStore(state => state.closeSideModal)

  return (
    <>
      <form className={'flex flex-col gap-7.5 py-5'}>
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>논문 제목</Text>
          <Input placeholder={'제목'} className={'w-full text-[14px] font-medium md:text-[18px]'} />
        </div>
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>제출 학회 (선택)</Text>
          <Input placeholder={'학회'} className={'w-full text-[14px] font-medium md:text-[18px]'} />
        </div>
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>주저자 (선택)</Text>
          <Input placeholder={'미입력 시 본인'} className={'w-full text-[14px] font-medium md:text-[18px]'} />
        </div>
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>공동저자 (선택)</Text>
          <Input placeholder={'공동저자'} className={'w-full text-[14px] font-medium md:text-[18px]'} />
        </div>
      </form>
      <Button className={'mb-5'} onClick={closeSideModal}>
        업무 생성하기
      </Button>
    </>
  )
}
