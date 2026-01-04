import { type ChangeEvent, useState } from 'react'
import type { Regist } from '@/features/auth/regist/model/types'

export const useRegist = () => {
  const [data, setData] = useState<Regist>({
    username: '',
    email: '',
    password: '',
    passwordCheck: '',
  })

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const isInput = (): boolean => {
    return !!(data.username.length && data.email.length && data.password.length && data.passwordCheck.length)
  }

  return { data, handleChangeData, isInput }
}
