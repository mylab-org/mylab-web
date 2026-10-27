'use client'
'use no memo'

import { useWorksCreateTaskFormHook } from '../model/use-works-create-task-form-hook'
import { Button } from '@/shared/ui/override/button'
import { Input } from '@/shared/ui/override/input'
import { Radio, RadioGroup } from '@/shared/ui/override/radio'
import { Text } from '@/shared/ui/override/text'

export const WorksCreateTaskForm = () => {
  const { register, setValue, type, onSubmit, isValid, isPending } = useWorksCreateTaskFormHook()

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-2.5 px-5 lg:w-[750px] lg:px-7.5">
      <form className={'flex flex-col gap-7.5 py-5'}>
        <div className={'flex flex-col gap-5'}>
          <Text className={'text-[16px] font-bold'}>업무 종류</Text>
          <RadioGroup
            value={type}
            onValueChange={value => setValue('type', value as TaskType, { shouldValidate: true })}
          >
            <Radio id={'task-type-work'} value={'WORK'} title={'개인 업무'} />
            <Radio id={'task-type-meeting'} value={'MEETING'} title={'미팅 준비'} />
          </RadioGroup>
        </div>
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>업무 제목</Text>
          <Input
            {...register('title', { required: true })}
            placeholder={'제목'}
            className={'w-full text-[14px] font-medium md:text-[18px]'}
          />
        </div>
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>업무 설명</Text>
          <Input
            {...register('description', { required: true })}
            placeholder={'설명'}
            className={'w-full text-[14px] font-medium md:text-[18px]'}
          />
        </div>
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>시작일</Text>
          <Input
            type={'date'}
            {...register('startAt', { required: true })}
            className={'w-full text-[14px] font-medium md:text-[18px]'}
          />
        </div>
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>종료일</Text>
          <Input
            type={'date'}
            {...register('endAt', { required: true })}
            className={'w-full text-[14px] font-medium md:text-[18px]'}
          />
        </div>
      </form>
      <Button className={'mb-5'} disabled={!isValid || isPending} onClick={onSubmit}>
        업무 생성하기
      </Button>
    </div>
  )
}
