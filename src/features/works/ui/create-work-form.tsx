import { useSideModalStore } from '@/shared/store'
import { Button } from '@/shared/ui/override/button'
import { Input } from '@/shared/ui/override/input'
import { Radio, RadioGroup } from '@/shared/ui/override/radio'
import { Text } from '@/shared/ui/text'

export const CreateWorkForm = () => {
  const closeSideModal = useSideModalStore(state => state.closeSideModal)

  return (
    <>
      <form className={'flex flex-col gap-7.5 py-5'}>
        <div className={'flex flex-col gap-5'}>
          <Text className={'text-[16px] font-bold'}>업무 종류</Text>
          <RadioGroup>
            <Radio value={'meeting'} title={'미팅 준비'} />
            <Radio value={'personal'} title={'개인 업무'} />
          </RadioGroup>
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
