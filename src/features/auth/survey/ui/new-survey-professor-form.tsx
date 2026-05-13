'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SurveyProfessorSchema } from '../model/survey.schema'
import { Button } from '@/shared/ui/button'
import { InputBox } from '@/shared/ui/input-box'
import { Text } from '@/shared/ui/text'
import type { SurveyProfessorValues } from '../model/survey.schema'

export const NewSurveyProfessorForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SurveyProfessorValues>({
    mode: 'onChange',
    resolver: zodResolver(SurveyProfessorSchema),
  })
  return (
    <>
      <Text className={'text-[24px] font-bold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실을 생성하세요'}</Text>
      <form id={'create-lab-form'} action="" className={'flex h-full w-full flex-col gap-5'}>
        <Text className={'text-[14px] font-semibold'}>연구실 검토는 평균 2일 이내에 처리됩니다.</Text>
        <InputBox labelName={'학교명'} {...register('schoolName')} placeholder={'학교명을 입력하세요'} />
        <InputBox labelName={'학과명'} {...register('departmentName')} placeholder={'학과명을 입력하세요'} />
        <InputBox labelName={'연구실명'} {...register('labName')} placeholder={'연구실명을 입력하세요'} />
        <Button
          form={'create-lab-form'}
          disabled={!isValid}
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
