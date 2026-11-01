'use client'
'use no memo'

import { useWorksCreateTaskFormHook } from '../model/use-works-create-task-form-hook'
import { Button } from '@/shared/ui/override/button'
import { DateRangePicker } from '@/shared/ui/override/date-picker'
import { Input } from '@/shared/ui/override/input'
import { Radio, RadioGroup } from '@/shared/ui/override/radio'
import { Text } from '@/shared/ui/override/text'
import { InputBox } from '@/shared/ui/template/input-box'

export const WorksCreateTaskForm = () => {
  const { register, setValue, type, startAt, endAt, handleRangeChange, onSubmit, isValid, isPending } =
    useWorksCreateTaskFormHook()

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
        <InputBox labelName={'업무 제목'} placeholder={'제목'} {...register('title', { required: true })} />
        <InputBox labelName={'업무 설명'} placeholder={'설명'} {...register('description', { required: true })} />
        <div className={'w-full'}>
          <Text className={'text-[14px] font-medium text-gray-600!'}>기간</Text>
          <DateRangePicker
            startAt={startAt}
            endAt={endAt}
            onChange={handleRangeChange}
            placeholder={'시작일 ~ 종료일'}
          />
        </div>
      </form>
      <Button className={'mb-5'} disabled={!isValid || isPending} onClick={onSubmit}>
        업무 생성하기
      </Button>
    </div>
  )
}
