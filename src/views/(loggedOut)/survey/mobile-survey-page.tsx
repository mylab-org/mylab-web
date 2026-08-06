'use client'

import { NewSurveyProfessorForm, NewSurveyStudentForm } from '@/features/survey'
import { MobileAuthHeader } from '@/widgets/layout/header'

export const MobileSurveyPage = () => {
  return (
    <>
      {/*<header className={'h-[60px] px-4 py-2.5'}></header>*/}
      <MobileAuthHeader isPrev />
      <div className={'flex h-full flex-col gap-7.5 px-7.5 pb-5'}>
        {/*<NewSurveyStudentForm />*/}
        <NewSurveyProfessorForm />
      </div>
    </>
  )
}
