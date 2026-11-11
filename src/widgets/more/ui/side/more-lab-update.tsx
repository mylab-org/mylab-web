'use client'

import { X } from 'lucide-react'
import type { LabInfoResponseType } from '@/entities/labs/model/types'
import { useLabsInfoUpdateFormHook } from '@/features/labs/model/use-labs-info-update-form-hook'
import { Button } from '@/shared/ui/override/button'
import { Input } from '@/shared/ui/override/input'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'
import { InputBox } from '@/shared/ui/template/input-box'

interface MoreLabUpdateProps {
  labInfo: LabInfoResponseType
}

export const MoreLabUpdate = ({ labInfo }: MoreLabUpdateProps) => {
  const {
    register,
    hashtags,
    hashtagInput,
    handleHashtagInputChange,
    maxHashtagLength,
    addHashtag,
    handleHashtagKeyDown,
    handleHashtagCompositionStart,
    handleHashtagCompositionEnd,
    removeHashtag,
    isHashtagLimitReached,
    maxHashtagCount,
    onSubmit,
    isValid,
    isPending,
  } = useLabsInfoUpdateFormHook(labInfo)

  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 overflow-auto px-5 pb-5 lg:w-[550px] lg:px-7.5'}>
      <div className={'flex flex-col gap-7.5 py-5'}>
        {/* 여기 원래 연구 분야 select 영역이였지만 미구현상태이므로 추후에 구현 시 리팩토링해야함. */}
        <div className={'flex flex-col gap-5'}>
          <Text className={'text-[12px] font-bold md:text-[16px]'}>연구실 기본 정보</Text>
          <div className={'border-border bg-muted/40 rounded-[12px] border px-3 py-2.5'}>
            <Text className={'text-[14px] font-medium md:text-[18px]'}>
              {labInfo.universityName} · {labInfo.departmentName}
            </Text>
          </div>
        </div>
        <InputBox
          labelName={'연구실 이름'}
          placeholder={'연구실 이름'}
          className={'w-full'}
          disabled={isPending}
          {...register('labName', { required: true })}
        />
        <InputBox
          labelName={'연구실 소개'}
          placeholder={'연구실 소개'}
          className={'w-full'}
          disabled={isPending}
          {...register('description', { required: true })}
        />
        <div className={'flex flex-col gap-5'}>
          <div className={'flex items-center gap-3'}>
            <Text className={'text-[12px]! font-bold md:text-[16px]!'}>연구실 해시태그</Text>
            <Text className={'text-muted-foreground! text-[12px] font-medium'}>
              {hashtags.length}/{maxHashtagCount}
            </Text>
          </div>
          <div className={'flex flex-wrap items-center gap-1.5'}>
            {!isHashtagLimitReached && (
              <div className={'border-border flex items-center gap-1 rounded-full border px-2 py-1'}>
                <Input
                  value={hashtagInput}
                  onChange={e => handleHashtagInputChange(e.target.value)}
                  onKeyDown={handleHashtagKeyDown}
                  onCompositionStart={handleHashtagCompositionStart}
                  onCompositionEnd={handleHashtagCompositionEnd}
                  maxLength={maxHashtagLength}
                  placeholder={'태그 입력'}
                  className={'h-auto border-none px-1 py-0 text-[12px]! md:text-[14px]!'}
                  disabled={isPending}
                />
                <button
                  type={'button'}
                  onClick={addHashtag}
                  disabled={isPending || hashtagInput.trim() === ''}
                  className={
                    'bg-muted shrink-0 rounded-full px-2.5 py-1 text-[12px] leading-5 font-medium disabled:opacity-50 md:text-[14px]'
                  }
                >
                  + 추가
                </button>
              </div>
            )}
            {hashtags.map(tag => (
              <Tag.Lab
                key={tag}
                className={'flex items-center gap-0.75'}
                Icon={
                  <button
                    type={'button'}
                    onClick={() => removeHashtag(tag)}
                    disabled={isPending}
                    aria-label={`${tag} 삭제`}
                  >
                    <X className={'h-4 w-4 cursor-pointer'} />
                  </button>
                }
              >
                {tag}
              </Tag.Lab>
            ))}
          </div>
        </div>
      </div>
      <Button className={'mt-5 text-[12px]! md:text-[16px]!'} onClick={onSubmit} disabled={!isValid || isPending}>
        {isPending ? '수정 중...' : '연구실 정보 수정하기'}
      </Button>
    </div>
  )
}
