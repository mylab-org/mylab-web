'use client'
'use no memo'

import { usePasswordUpdateFormHook } from '../model/use-password-update-form-hook'
import { Button } from '@/shared/ui/override/button'
import { InputBox } from '@/shared/ui/template/input-box'

export const UserPasswordUpdateForm = () => {
  const { register, onSubmit, isValid, errors, isPending } = usePasswordUpdateFormHook()

  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 px-5 lg:w-[550px] lg:px-7.5'}>
      <div className={'flex flex-col items-center gap-5 py-5'}>
        <InputBox
          className="w-full"
          labelName={'현재 비밀번호'}
          placeholder={'현재 비밀번호를 입력하세요'}
          type="password"
          {...register('currentPassword', {
            required: '현재 비밀번호를 입력해주세요.',
          })}
          disabled={isPending}
          isError={!!errors.currentPassword}
          errorMsg={errors.currentPassword?.message}
        />
        <InputBox
          className="w-full"
          labelName={'새 비밀번호'}
          placeholder={'새 비밀번호를 입력해주세요.'}
          type="password"
          {...register('newPassword', {
            required: '새 비밀번호를 입력해주세요.',
          })}
          disabled={isPending}
          isError={!!errors.newPassword}
          errorMsg={errors.newPassword?.message}
        />
        <InputBox
          className="w-full"
          labelName={'새 비밀번호 확인'}
          placeholder={'새 비밀번호를 다시 입력해주세요.'}
          type="password"
          {...register('newPasswordConfirm', {
            required: '새 비밀번호 확인을 입력해주세요.',
          })}
          disabled={isPending}
          isError={!!errors.newPasswordConfirm}
          errorMsg={errors.newPasswordConfirm?.message}
        />
      </div>
      <Button className={'mt-7.5 text-[12px]! md:text-[16px]!'} onClick={onSubmit} disabled={!isValid || isPending}>
        비밀번호 변경하기
      </Button>
    </div>
  )
}
