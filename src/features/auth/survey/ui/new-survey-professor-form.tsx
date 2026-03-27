'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { SurveyProfessorSchema } from '../model/survey.schema'
import { Button } from '@/shared/ui/button'
import { FloatingLabel } from '@/shared/ui/floating-label'
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
      <form id={'create-lab-form'} action="" className={'flex w-full flex-col gap-5'}>
        {/*<FloatingLabel labelName={'학교 이름'} {...register('schoolName')} />*/}
        {/*<FloatingLabel labelName={'학과 이름'} {...register('departmentName')} />*/}
        {/*<FloatingLabel labelName={'연구실 이름'} {...register('labName')} />*/}
        <div className="group relative">
          <label
            htmlFor="id"
            className="group-focus-within:text-main absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-colors"
          >
            학교명
          </label>
          <input
            type="text"
            {...register('schoolName')}
            placeholder="학교명을 입력하세요"
            className="focus:border-main w-full rounded-2xl border-2 border-gray-100 px-5 py-4.5 text-sm font-medium transition-all outline-none placeholder:text-gray-300 focus:ring-0"
          />
        </div>
        <div className="group relative">
          <label
            htmlFor="id"
            className="group-focus-within:text-main absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-colors"
          >
            학과명
          </label>
          <input
            type="text"
            {...register('departmentName')}
            placeholder="학과명을 입력하세요"
            className="focus:border-main w-full rounded-2xl border-2 border-gray-100 px-5 py-4.5 text-sm font-medium transition-all outline-none placeholder:text-gray-300 focus:ring-0"
          />
        </div>
        <div className="group relative">
          <label
            htmlFor="id"
            className="group-focus-within:text-main absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-colors"
          >
            연구실명
          </label>
          <input
            type="text"
            {...register('labName')}
            placeholder="연구실명을 입력하세요"
            className="focus:border-main w-full rounded-2xl border-2 border-gray-100 px-5 py-4.5 text-sm font-medium transition-all outline-none placeholder:text-gray-300 focus:ring-0"
          />
        </div>
      </form>
      <Button form={'create-lab-form'} disabled={!isValid}>
        연구실 생성하기
      </Button>
      <Text className={'text-[14px] font-semibold'}>연구실 검토는 평균 2일 이내에 처리됩니다.</Text>
    </>
  )
}
