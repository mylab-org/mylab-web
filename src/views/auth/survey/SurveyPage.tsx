import { NewSurveyProfessorForm, NewSurveyStudentForm, ProfessorForm, StudentForm } from '@/features/auth/survey'

export const SurveyPage = () => {
  return (
    <div className={'flex h-full flex-col gap-4'}>
      {/*<StudentForm />*/}
      {/*<ProfessorForm />*/}
      {/*<NewSurveyStudentForm />*/}
      <NewSurveyProfessorForm />
    </div>
  )
}
