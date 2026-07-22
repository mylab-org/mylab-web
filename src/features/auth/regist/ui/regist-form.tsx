'use client'

import { type ChangeEvent, useActionState } from 'react'
import { useFormContext } from 'react-hook-form'
import { handleRegistAction } from '../model/regist-action'
import { FloatingLabel } from '@/shared/ui/floating-label'
import { Button } from '@/shared/ui/override/button'
import type { Regist } from '../model/types'

type Props = {
  data: Regist
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const RegistForm = ({ data, onChange }: Props) => {
  const initialState = { success: false, emailMsg: '', pwMsg: '', pwCheckMsg: '' }
  const [state, dispatch] = useActionState(handleRegistAction, initialState)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<Regist>()

  const onSubmit = handleSubmit((data: Regist) => {
    console.log('제출', data)
  })

  return (
    <form
      id={'signup-form'}
      // onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
      //   e.preventDefault()
      //   dispatch(new FormData(e.currentTarget))
      // }}
      onSubmit={onSubmit}
      className={'flex w-[400px] flex-col gap-7.5'}
    >
      <FloatingLabel
        labelName={'이름'}
        className={'w-full'}
        {...register('username')}
        isError={!!errors.username}
        errorMsg={errors.username?.message}
      />
      <FloatingLabel
        labelName={'이메일'}
        className={'w-full'}
        {...register('email')}
        isError={!!errors.email}
        errorMsg={errors.email?.message}
      />
      <FloatingLabel
        type={'password'}
        labelName={'비밀번호'}
        className={'w-full'}
        {...register('password')}
        isError={!!errors.password}
        errorMsg={errors.password?.message}
      />
      <FloatingLabel
        type={'password'}
        labelName={'비밀번호 확인'}
        className={'w-full'}
        {...register('passwordCheck')}
        isError={!!errors.passwordCheck}
        errorMsg={errors.passwordCheck?.message}
      />
      <Button type="submit">가입하기</Button>
    </form>
  )
}
