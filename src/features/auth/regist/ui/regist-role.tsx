import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Radio } from '@/shared/ui/radio'
import type { SignUpType } from '../model/types'

export const RegistRole = () => {
  const { register, watch, setValue } = useFormContext<SignUpType>()
  const type = watch('type')

  useEffect(() => {
    if (type === 'professor') {
      setValue('grade', undefined)
    } else {
      setValue('grade', '1')
    }
  }, [type, setValue])

  return (
    <div className={'flex flex-col gap-2.5'}>
      <div className={'flex gap-5'}>
        <Radio id={'type1'} value={'professor'} title={'교수'} {...register('type')} />
        <Radio id={'type2'} value={'student'} title={'연구원'} {...register('type')} />
      </div>
      {type === 'student' && (
        <div className={'flex gap-5'}>
          <Radio id={'grade1'} value={'1'} title={'학부생'} {...register('grade')} />
          <Radio id={'grade2'} value={'2'} title={'석사'} {...register('grade')} />
          <Radio id={'grade3'} value={'3'} title={'박사'} {...register('grade')} />
        </div>
      )}
    </div>
  )
}
