'use client'
'use no memo'

import { Image } from 'next/dist/client/image-component'
import { Controller } from 'react-hook-form'
import { useBoardCreateFormHook } from '../model/use-board-create-form-hook'
import { Button } from '@/shared/ui/override/button'
import { CheckBox } from '@/shared/ui/override/checkbox'
import { Textarea } from '@/shared/ui/override/textarea'

type Props = {
  onClose: () => void
}

export const BoardCreateForm = ({ onClose }: Props) => {
  const { register, control, onSubmit, isValid, isPending } = useBoardCreateFormHook({ onClose })

  return (
    <form className={'flex flex-col overflow-hidden rounded-[16px] border border-gray-200'}>
      <input
        type="text"
        className={
          'border-b border-b-gray-200 p-3 text-[14px] font-medium outline-0 placeholder:text-gray-400 md:text-[16px]'
        }
        placeholder={'제목'}
        {...register('title', { required: true })}
      />
      <Textarea
        className={'h-[120px] px-3 py-2.5 text-[14px] md:h-[200px] md:text-[16px]'}
        placeholder={'홍길동 님의 소식을 전해주세요'}
        {...register('content', { required: true })}
      />
      <div className={'flex flex-col border-t border-t-gray-200'}>
        <div className={'flex gap-1.25 px-3 pt-3'}>
          <div className={'h-[48px] w-[48px] rounded-[8px] border border-gray-200 md:h-[80px] md:w-[80px]'} />
          <div
            className={
              'flex h-[48px] w-[48px] items-center justify-center rounded-[8px] border border-gray-200 md:h-[80px] md:w-[80px]'
            }
          >
            <Image src={'/icon/icon_board_add.svg'} alt={''} width={24} height={24} />
          </div>
        </div>
        <div className={'flex gap-5 p-3'}>
          <Controller
            name="isAnonymous"
            control={control}
            render={({ field }) => (
              <CheckBox
                title="익명"
                checked={field.value}
                onCheckedChange={checked => field.onChange(checked === true)}
              />
            )}
          />
          <Image
            src={'/icon/icon_main_img.svg'}
            alt={''}
            width={24}
            height={24}
            className={'h-[16px] w-[16px] md:h-[24px] md:w-[24px]'}
          />
        </div>
        <Button
          disabled={!isValid || isPending}
          className={'rounded-t-[6px] rounded-b-none text-[14px]! md:text-[16px]'}
          onClick={onSubmit}
        >
          게시
        </Button>
      </div>
    </form>
  )
}
