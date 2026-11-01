'use client'
'use no memo'

import { useWorksCreatePaperFormHook } from '../model/use-works-create-paper-form-hook'
import { Button } from '@/shared/ui/override/button'
import { Input } from '@/shared/ui/override/input'
import { Text } from '@/shared/ui/override/text'
import { InputBox } from '@/shared/ui/template/input-box'

export const WorksCreatePaperForm = () => {
  const { register, onSubmit, isValid, isPending } = useWorksCreatePaperFormHook()

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-2.5 px-5 lg:w-[750px] lg:px-7.5">
      <form className={'flex flex-col gap-7.5 py-5'}>
        <InputBox labelName={'논문 제목'} placeholder={'제목'} {...register('title', { required: true })} />
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
      <Button className={'mb-5'} disabled={!isValid || isPending} onClick={onSubmit}>
        업무 생성하기
      </Button>
    </div>
  )
}
