'use client'

import { useLoginFormHook } from '../model/use-login-form-hook'
import { Button } from '@/shared/ui/override/button'
import { InputBox } from '@/shared/ui/template/input-box'

export const LoginForm = () => {
  const { register, onSubmit, isValid, errors, isSubmitting } = useLoginFormHook()

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
