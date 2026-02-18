'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { SurveyStudentValues } from '@/features/auth/survey/model/survey.schema'
import { SurveyStudentSchema } from '@/features/auth/survey/model/survey.schema'
import { useModalStore } from '@/shared/store'
import { Button, FloatingLabel, P } from '@/shared/ui'
import { StuLabModal } from '@/widgets/modal'

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
      <P className={'text-[32px] font-semibold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실에 참여하세요'}</P>
      <form
        id={'join-lab-form'}
        className={'flex w-[400px] flex-col gap-[20px]'}
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
      <Button form={'join-lab-form'} variant={errors.labCode ? 'error' : labCode.length === 6 ? 'primary' : 'noActive'}>
        연구실 참여하기
      </Button>
    </>
  )
}
