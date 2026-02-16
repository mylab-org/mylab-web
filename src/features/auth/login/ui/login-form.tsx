'use client'

import clsx from 'clsx'
import { useActionState } from 'react'
import { handleLoginAction } from '@/features/auth/login/model/login-action'
import { FloatingLabel, Input, P } from '@/shared/ui'

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
      className={'border-red flex w-[400px] flex-col gap-[30px]'}
    >
      {/*<Input className={clsx(state.idMsg && '!border-b-error')} type={'text'} name={'email'} placeholder={'이메일'} />*/}
      {/*<P className={'!text-error text-[12px]'}>{state.idMsg}</P>*/}
      {/*<Input*/}
      {/*  className={clsx(state.pwMsg && '!border-b-error')}*/}
      {/*  type={'password'}*/}
      {/*  name={'password'}*/}
      {/*  placeholder={'비밀번호'}*/}
      {/*/>*/}
      {/*<P className={'!text-error text-[12px]'}>{state.pwMsg}</P>*/}
      <FloatingLabel labelName={'이메일'} name={'email'} type={'text'} isError={!!state.idMsg} errorMsg={state.idMsg} />
      <FloatingLabel
        labelName={'비밀번호'}
        name={'password'}
        type={'password'}
        isError={!!state.pwMsg}
        errorMsg={state.pwMsg}
      />
    </form>
  )
}
