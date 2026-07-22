'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '../model/login.schema'
import { InputBox } from '@/shared/ui/input-box'
import { Button } from '@/shared/ui/override/button'
import type { LoginPayload } from '../model/types'

export const LoginForm = () => {
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

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <InputBox
        labelName={'이메일'}
        placeholder={'이메일을 입력하세요'}
        {...register('email', {
          required: '이메일을 입력해주세요.',
        })}
        disabled={isSubmitting}
        isError={!!errors.email}
        errorMsg={errors.email?.message}
      />
      <InputBox
        type={'password'}
        labelName={'비밀번호'}
        placeholder={'비밀번호를 입력하세요'}
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
        })}
        disabled={isSubmitting}
        isError={!!errors.password}
        errorMsg={errors.password?.message}
      />
      <Button
        type="submit"
        color={'main'}
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
        disabled={!isValid || isSubmitting}
      >
        로그인하기
      </Button>
    </form>
  )
}
