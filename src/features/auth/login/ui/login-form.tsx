'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useActionState } from 'react'
import { useForm } from 'react-hook-form'
import { handleLoginAction } from '@/features/auth/login/model/login-action'
import { type LoginFormValues, LoginSchema } from '@/features/auth/login/model/login.schema'
import { Button } from '@/shared/ui/button'
import { FloatingLabel } from '@/shared/ui/floating-label'

type LoginFormState = {
  email: string
  password: string
}

export const LoginForm = () => {
  // const initialState = { success: false, idMsg: '', pwMsg: '' }
  // const [state, dispatch] = useActionState(handleLoginAction, initialState)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async (data: LoginFormState) => {
    try {
      await axios.post('/api/login', data)

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
  }

  return (
    <form
      // onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
      //   e.preventDefault()
      //   dispatch(new FormData(e.currentTarget))
      // }}
      onSubmit={handleSubmit(onSubmit)}
      className={'border-red flex w-[400px] flex-col gap-[30px]'}
    >
      <FloatingLabel
        labelName={'이메일'}
        {...register('email', {
          required: '이메일을 입력해주세요.',
        })}
        disabled={isSubmitting}
        type={'text'}
        // isError={!!state.idMsg}
        // errorMsg={state.idMsg}
        isError={!!errors.email}
        errorMsg={errors.email?.message}
      />
      <FloatingLabel
        labelName={'비밀번호'}
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
        })}
        type={'password'}
        disabled={isSubmitting}
        // isError={!!state.pwMsg}
        // errorMsg={state.pwMsg}
        isError={!!errors.password}
        errorMsg={errors.password?.message}
      />
      <Button>로그인</Button>
    </form>
  )
}
