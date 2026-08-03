'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SurveyStudentSchema } from '../model/survey.schema'
import { useModalStore } from '@/shared/store'
import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'
import { InputBox } from '@/shared/ui/template/input-box'
import { StuLabModal } from '@/widgets/layout/modal'
import type { SurveyStudentValues } from '../model/survey.schema'

export const NewSurveyStudentForm = () => {
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
      <Text className={'text-[24px] font-bold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실에 참여하세요'}</Text>
      <form
        id={'join-lab-form'}
        className={'flex w-full flex-1 flex-col gap-5'}
        onSubmit={handleSubmit(data => {
          console.log(data)
          setError('labCode', {
            message: '초대코드를 다시 확인해주세요',
          })
        })}
      >
        <InputBox
          labelName={'초대코드'}
          placeholder={'초대코드를 입력하세요'}
          {...register('labCode')}
          isError={!!errors.labCode}
          errorMsg={errors.labCode?.message}
        />
        <Button
          form={'join-lab-form'}
          color={errors.labCode ? 'error' : labCode.length === 6 ? 'main' : 'none'}
          disabled={labCode.length !== 6}
          className="group flex w-full transform py-5 transition-all duration-300 hover:bg-gray-900 active:scale-[0.98]"
          icon={
            <svg
              className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          }
          iconPosition={'after'}
        >
          연구실 참여하기
        </Button>
      </form>
    </>
  )
}
