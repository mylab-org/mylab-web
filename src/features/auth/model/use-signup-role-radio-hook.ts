'use client'

import { useFormContext, useWatch } from 'react-hook-form'
import type { PostAuthRegisterPayloadType } from './types'

export const useSignupRoleRadioHook = () => {
  const { setValue, control } = useFormContext<PostAuthRegisterPayloadType>()
  const degree = useWatch({ control, name: 'degree' })
  const role = degree === 'PROFESSOR' ? 'professor' : 'researcher'

  const handleRoleChange = (value: string) => {
    if (value === 'professor') {
      setValue('degree', 'PROFESSOR')
      return
    }

    setValue('degree', 'BACHELOR')
  }

  return {
    role,
    degree,
    setValue,
    handleRoleChange,
  }
}
