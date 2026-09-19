'use client'

import { useSignupRoleRadioHook } from '../model/use-signup-role-radio-hook'
import type { UserDegreeType } from '@/entities/user/model/types'
import { Radio, RadioGroup } from '@/shared/ui/override/radio'

export const RegistRoleRadio = () => {
  // const { watch, setValue } = useFormContext<PostAuthRegisterPayloadType>()
  // const degree = watch('degree')
  // const role = degree === 'PROFESSOR' ? 'professor' : 'researcher'

  // const handleRoleChange = (value: string) => {
  //   if (value === 'professor') {
  //     setValue('degree', 'PROFESSOR')
  //     return
  //   }

  //   setValue('degree', 'BACHELOR')
  // }

  const { role, degree, setValue, handleRoleChange } = useSignupRoleRadioHook()

  return (
    <div className={'flex flex-col gap-2.5'}>
      <RadioGroup value={role} onValueChange={handleRoleChange}>
        <Radio id={'role-professor'} value={'professor'} title={'교수'} />
        <Radio id={'role-researcher'} value={'researcher'} title={'연구원'} />
      </RadioGroup>
      {role === 'researcher' && (
        <RadioGroup value={degree} onValueChange={value => setValue('degree', value as UserDegreeType)}>
          <Radio id={'degree-bachelor'} value={'BACHELOR'} title={'학부생'} />
          <Radio id={'degree-master'} value={'MASTER'} title={'석사'} />
          <Radio id={'degree-doctor'} value={'DOCTOR'} title={'박사'} />
        </RadioGroup>
      )}
    </div>
  )
}
