import { headers } from 'next/headers'
import { MobileSurveyPage, SurveyPage } from '@/views/(loggedOut)/survey'

const AuthSurvey = async () => {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return <MobileSurveyPage />
  } else {
    return <SurveyPage />
  }
}

export default AuthSurvey
