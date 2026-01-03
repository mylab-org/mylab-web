'use client'

import { useRef } from 'react'
import { FloatingLabel, Radio } from '@/shared/ui'

export const RegistForm = () => {
  const degreeRef = useRef(null)

  const handleChangeRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!degreeRef.current) return

    degreeRef.current.style.display = e.target.value === 'student' ? 'flex' : 'none'
  }

  return (
    <form id={'login-form'} action="" className={'flex w-[400px] flex-col gap-[20px]'}>
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
        <Radio id={'survey3'} name={'student'} title={'학부생'} defaultChecked />
        <Radio id={'survey4'} name={'student'} title={'석사'} />
        <Radio id={'survey5'} name={'student'} title={'박사'} />
      </div>
      <FloatingLabel type={'text'} labelName={'이름'} name={'name'} className={'w-full'} />
      <FloatingLabel
        type={'text'}
        labelName={'이메일'}
        name={'email'}
        className={'w-full'}
        errorMsg={'이미 사용 중인 아이디입니다'}
      />
      <FloatingLabel
        type={'password'}
        labelName={'비밀번호'}
        name={'password'}
        className={'w-full'}
        errorMsg={'비밀번호는 8자 이상이어야 합니다'}
      />
      <FloatingLabel
        type={'password'}
        labelName={'비밀번호 확인'}
        name={'passwordCheck'}
        className={'w-full'}
        errorMsg={'비밀번호가 일치하지 않습니다'}
      />
    </form>
  )
}
