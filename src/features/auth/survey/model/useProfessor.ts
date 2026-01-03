import { type ChangeEvent, useState } from 'react'
import type { CreateLab } from '@/features/auth/survey/model/types'

export const useProfessor = () => {
  const [data, setData] = useState<CreateLab>({
    schoolName: '',
    departmentName: '',
    labName: '',
  })

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const isInput = (): boolean => {
    return !!(data.labName.length && data.schoolName.length && data.departmentName.length)
  }

  return { data, isInput, handleChangeData }
}
