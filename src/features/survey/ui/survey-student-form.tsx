'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SurveyStudentSchema } from '../model/survey.schema'
import { useModalStore } from '@/shared/store'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'
import { FloatingLabel } from '@/shared/ui/template/floating-label'
import { StuLabModal } from '@/widgets/layout/modal'
import type { SurveyStudentValues } from '../model/survey.schema'

export const StudentForm = () => {
  const isStuModal = useModalStore(state => state.isStuModal)

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<SurveyStudentValues>({
    mode: 'onChange',
    defaultValues: {
      labCode: '',
    },
    resolver: zodResolver(SurveyStudentSchema),
  })

  const labCode = watch('labCode')

  return (
    <>
      {isStuModal && <StuLabModal />}
      <Text className={'text-[32px] font-semibold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실에 참여하세요'}</Text>
      <form
        id={'join-lab-form'}
        className={'flex w-[400px] flex-col gap-5'}
        onSubmit={handleSubmit(data => {
          console.log(data)
          setError('labCode', {
            message: '초대코드를 다시 확인해주세요',
          })
        })}
      >
        <FloatingLabel
          labelName={'초대코드'}
          {...register('labCode')}
          isError={!!errors.labCode}
          errorMsg={errors.labCode?.message}
        />
      </form>
      <Button
        // form={'join-lab-form'}
        onClick={() => console.log('eee')}
        color={errors.labCode ? 'error' : labCode.length === 6 ? 'main' : 'none'}
        disabled={labCode.length !== 6}
      >
        연구실 참여하기
      </Button>
    </>
  )
}
