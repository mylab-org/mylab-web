import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Radio, RadioGroup } from '@/shared/ui/override/radio'
import type { SignUpType } from '../model/types'

export const RegistRole = () => {
  const { watch, setValue } = useFormContext<SignUpType>()
  const type = watch('type')
  const grade = watch('grade')

  useEffect(() => {
    if (type === 'professor') {
      setValue('grade', undefined)
    } else {
      setValue('grade', '1')
    }
  }, [type, setValue])

  return (
    <div className={'flex flex-col gap-2.5'}>
      <RadioGroup value={type} onValueChange={value => setValue('type', value as SignUpType['type'])}>
        <Radio id={'type1'} value={'professor'} title={'교수'} />
        <Radio id={'type2'} value={'student'} title={'연구원'} />
      </RadioGroup>
      {type === 'student' && (
        <RadioGroup value={grade} onValueChange={value => setValue('grade', value)}>
          <Radio id={'grade1'} value={'1'} title={'학부생'} />
          <Radio id={'grade2'} value={'2'} title={'석사'} />
          <Radio id={'grade3'} value={'3'} title={'박사'} />
        </RadioGroup>
      )}
    </div>
  )
}
