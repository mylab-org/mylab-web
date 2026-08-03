import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { LoginSchema } from './login.schema'
import type { LoginPayload } from './types'

export const useLoginFormHook = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors, isSubmitting },
  } = useForm<LoginPayload>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = handleSubmit(async (values: LoginPayload) => {
    try {
      await axios.post('/api/login', values)

      // 성공 시 처리
      console.log('로그인 성공')
    } catch (error: any) {
      // 서버에서 내려준 에러 처리
      if (error.response?.data?.field === 'email') {
        setError('email', {
          type: 'server',
          message: error.response.data.message,
        })
      } else if (error.response?.data?.field === 'password') {
        setError('password', {
          type: 'server',
          message: error.response.data.message,
        })
      } else {
        alert('로그인에 실패했습니다.')
      }
    }
  })

  return {
    register,
    onSubmit,
    isValid,
    errors,
    isSubmitting,
  }
}
