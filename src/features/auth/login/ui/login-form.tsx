'use client'

import clsx from 'clsx'
import { useActionState } from 'react'
import { handleLoginAction } from '@/features/auth/login/model/login-action'
import { Input, P } from '@/shared/ui'

export const LoginForm = () => {
  const initialState = { success: false, idMsg: '', pwMsg: '' }
  const [state, dispatch] = useActionState(handleLoginAction, initialState)

  return (
    <form
      id={'login-form'}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(new FormData(e.currentTarget))
      }}
      className={'flex w-[400px] flex-col'}
    >
      <Input className={clsx(state.idMsg && '!border-b-error')} type={'text'} name={'email'} placeholder={'이메일'} />
      <P className={'!text-error text-[12px]'}>{state.idMsg}</P>
      <Input
        className={clsx(state.pwMsg && '!border-b-error')}
        type={'password'}
        name={'password'}
        placeholder={'비밀번호'}
      />
      <P className={'!text-error text-[12px]'}>{state.pwMsg}</P>
    </form>
  )
}
