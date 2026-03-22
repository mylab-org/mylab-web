import { ProfessorForm, StudentForm } from '@/features/auth/survey'
import { AuthLinkItem } from '@/widgets/auth'

export const SurveyPage = () => {
  return (
    <div className={'flex flex-col gap-4'}>
      <StudentForm />
      {/*<ProfessorForm />*/}
      <footer>
        <AuthLinkItem title={'로그인하러 가기'} text={'이미 계정이 있으신가요?'} href={'/login'} />
      </footer>
    </div>
  )
}
