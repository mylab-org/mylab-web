'use client'

import { NewSurveyProfessorForm, NewSurveyStudentForm } from '@/features/auth/survey'

export const MobileSurveyPage = () => {
  return (
    <>
      <header className={'h-[60px] px-4 py-2.5'}></header>
      <div className={'flex h-full flex-col gap-7.5 px-7.5 pb-5'}>
        {/*<NewSurveyStudentForm />*/}
        <NewSurveyProfessorForm />
      </div>
    </>
  )
}
