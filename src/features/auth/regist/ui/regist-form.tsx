'use client'

import { type ChangeEvent, useActionState, useRef } from 'react'
import { handleRegistAction } from '@/features/auth/regist/model/regist-action'
import type { Regist } from '@/features/auth/regist/model/types'
import { FloatingLabel, Radio } from '@/shared/ui'

type Props = {
  data: Regist
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const RegistForm = ({ data, onChange }: Props) => {
  const initialState = { success: false, emailMsg: '', pwMsg: '', pwCheckMsg: '' }
  const [state, dispatch] = useActionState(handleRegistAction, initialState)
  const degreeRef = useRef<HTMLDivElement | null>(null)

  const handleChangeRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!degreeRef.current) return

    degreeRef.current.style.display = e.target.value === 'student' ? 'flex' : 'none'
  }

  return (
    <form
      id={'regist-form'}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(new FormData(e.currentTarget))
      }}
      className={'flex w-[400px] flex-col gap-[20px]'}
    >
      <div className={'flex gap-[20px]'}>
        <Radio
          id={'survey1'}
          name={'role'}
          value={'professor'}
          title={'교수'}
          defaultChecked
          onChange={handleChangeRole}
        />
        <Radio id={'survey2'} name={'role'} value={'student'} title={'연구원'} onChange={handleChangeRole} />
      </div>
      <div ref={degreeRef} className={'hidden gap-[20px]'}>
        <Radio id={'survey3'} name={'stu'} value={'1'} title={'학부생'} defaultChecked />
        <Radio id={'survey4'} name={'stu'} value={'2'} title={'석사'} />
        <Radio id={'survey5'} name={'stu'} value={'3'} title={'박사'} />
      </div>
      <FloatingLabel
        type={'text'}
        labelName={'이름'}
        name={'username'}
        className={'w-full'}
        value={data.username}
        onChange={onChange}
      />
      <FloatingLabel
        type={'text'}
        labelName={'이메일'}
        name={'email'}
        className={'w-full'}
        value={data.email}
        onChange={onChange}
        isError={!!state.emailMsg}
        errorMsg={state.emailMsg}
      />
      <FloatingLabel
        type={'password'}
        labelName={'비밀번호'}
        name={'password'}
        className={'w-full'}
        value={data.password}
        onChange={onChange}
        isError={!!state.pwMsg}
        errorMsg={state.pwMsg}
      />
      <FloatingLabel
        type={'password'}
        labelName={'비밀번호 확인'}
        name={'passwordCheck'}
        className={'w-full'}
        value={data.passwordCheck}
        onChange={onChange}
        isError={!!state.pwCheckMsg}
        errorMsg={state.pwCheckMsg}
      />
    </form>
  )
}
