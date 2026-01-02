'use client'

import clsx from 'clsx'
import { useProfessor } from '@/features/auth/survey/model/useProfessor'
import { Button, FloatingLabel, Input, P } from '@/shared/ui'

export const ProfessorForm = () => {
  const { data, isInput, handleChangeData } = useProfessor()
  return (
    <>
      <P className={'text-[32px] font-semibold whitespace-pre-wrap'}>{'김땡땡 님,\n연구실을 생성하세요'}</P>
      <form id={'create-lab-form'} action="" className={'flex w-[400px] flex-col gap-[20px]'}>
        <FloatingLabel
          labelName={'학교 이름'}
          name={'schoolName'}
          value={data.schoolName}
          onChange={handleChangeData}
          isError={true}
        />
        <FloatingLabel
          labelName={'학과 이름'}
          name={'departmentName'}
          value={data.departmentName}
          onChange={handleChangeData}
          isError={false}
        />
        <FloatingLabel
          labelName={'연구실 이름'}
          name={'labName'}
          value={data.labName}
          onChange={handleChangeData}
          isError={false}
        />
      </form>
      <Button form={'create-lab-form'} variant={isInput() ? 'primary' : 'noActive'}>
        연구실 생성하기
      </Button>
      <P className={'text-[18px] font-medium'}>연구실 검토는 평균 2일 이내에 처리됩니다.</P>
    </>
  )
}
