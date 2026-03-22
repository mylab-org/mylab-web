'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SurveyProfessorSchema } from '../model/survey.schema'
import { useProfessor } from '../model/useProfessor'
import { Button } from '@/shared/ui/button'
import { FloatingLabel } from '@/shared/ui/floating-label'
import { Text } from '@/shared/ui/text'
import type { SurveyProfessorValues } from '../model/survey.schema'

export const ProfessorForm = () => {
  const { data, isInput, handleChangeData } = useProfessor()

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
      <Text className={'text-[32px] font-semibold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실을 생성하세요'}</Text>
      <form id={'create-lab-form'} action="" className={'flex w-[400px] flex-col gap-5'}>
        <FloatingLabel labelName={'학교 이름'} {...register('schoolName')} />
        <FloatingLabel labelName={'학과 이름'} {...register('departmentName')} />
        <FloatingLabel labelName={'연구실 이름'} {...register('labName')} />
      </form>
      <Button form={'create-lab-form'} disabled={!isValid}>
        연구실 생성하기
      </Button>
      <Text className={'text-[18px] font-medium'}>연구실 검토는 평균 2일 이내에 처리됩니다.</Text>
    </>
  )
}
