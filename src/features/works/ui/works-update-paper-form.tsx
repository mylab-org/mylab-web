'use client'
'use no memo'

import { useWorksUpdatePaperFormHook } from '../model/use-works-update-paper-form-hook'
import type { WorksPaperDetailResponseType } from '@/entities/works/model/types'
import { Button } from '@/shared/ui/override/button'
import { Input } from '@/shared/ui/override/input'
import { Text } from '@/shared/ui/override/text'

interface Props {
  paperId: number
  defaultTitle: string
  onSuccess?: (updatedPaper: WorksPaperDetailResponseType) => void
}

export const WorksUpdatePaperForm = ({ paperId, defaultTitle, onSuccess }: Props) => {
  const { register, onSubmit, isValid, isPending } = useWorksUpdatePaperFormHook({ paperId, defaultTitle, onSuccess })

  return (
    <>
      <form className={'flex flex-col gap-7.5 py-5'}>
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>논문 제목</Text>
          <Input
            {...register('title', { required: true })}
            placeholder={'제목'}
            className={'w-full text-[14px] font-medium md:text-[18px]'}
          />
        </div>
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>제출 학회 (선택)</Text>
          <Input placeholder={'학회'} className={'w-full text-[14px] font-medium md:text-[18px]'} />
        </div>
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>주저자 (선택)</Text>
          <Input placeholder={'주저자'} className={'w-full text-[14px] font-medium md:text-[18px]'} />
        </div>
      </form>
      <Button className={'mb-5'} disabled={!isValid || isPending} onClick={onSubmit}>
        수정하기
      </Button>
    </>
  )
}
