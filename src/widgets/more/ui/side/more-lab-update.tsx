'use client'
'use no memo'

import { X } from 'lucide-react'
import { useRef, useState } from 'react'
import type { LabsDetailResponseType } from '@/entities/labs/model/types'
import { RESEARCH_FIELD_MAX_COUNT, RESEARCH_FIELD_MAX_LENGTH, useLabsUpdateFormHook } from '@/features/labs'
import { Button } from '@/shared/ui/override/button'
import { Input } from '@/shared/ui/override/input'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'
import { InputBox } from '@/shared/ui/template/input-box'

interface MoreLabUpdateProps {
  labId?: number
  lab?: LabsDetailResponseType
  onUpdated?: () => void
}

export const MoreLabUpdate = ({ labId, lab, onUpdated }: MoreLabUpdateProps) => {
  const { register, errors, isValid, onSubmit, isPending, researchFields, addResearchField, removeResearchField } =
    useLabsUpdateFormHook({ labId, lab, onUpdateSuccess: onUpdated })

  const [fieldDraft, setFieldDraft] = useState<string>('')
  const isComposingRef = useRef<boolean>(false)
  const clearAfterCompositionRef = useRef<boolean>(false)
  const isResearchFieldLimitReached = researchFields.length >= RESEARCH_FIELD_MAX_COUNT

  const handleAddField = () => {
    if (!addResearchField(fieldDraft)) return

    setFieldDraft('')
    // 조합 중 비우면 compositionend 가 마지막 글자를 되돌려 넣어 한 번 더 비움
    if (isComposingRef.current) clearAfterCompositionRef.current = true
  }

  const handleCompositionEnd = () => {
    isComposingRef.current = false
    if (!clearAfterCompositionRef.current) return

    setFieldDraft('')
    clearAfterCompositionRef.current = false
  }

  return (
    <form
      className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 overflow-auto px-5 pb-5 lg:w-[550px] lg:px-7.5'}
      onSubmit={onSubmit}
    >
      <div className={'flex flex-col gap-7.5 py-5'}>
        <div className={'flex flex-col gap-5'}>
          <Text className={'text-[12px] font-bold md:text-[16px]'}>연구실 기본 정보</Text>
          <div className={'border-border bg-muted/40 rounded-[12px] border px-3 py-2.5'}>
            <Text className={'text-[14px] font-medium md:text-[18px]'}>
              {lab?.universityName} · {lab?.departmentName}
            </Text>
          </div>
        </div>
        <InputBox
          labelName={'연구실 이름'}
          placeholder={'연구실 이름'}
          className={'w-full'}
          disabled={isPending}
          isError={!!errors.labName}
          errorMsg={errors.labName?.message}
          {...register('labName', {
            required: '연구실 이름을 입력해주세요.',
            minLength: { value: 2, message: '연구실 이름은 최소 2자 이상이어야 합니다.' },
          })}
        />
        <InputBox
          labelName={'연구실 소개'}
          placeholder={'연구실 소개'}
          className={'w-full'}
          disabled={isPending}
          isError={!!errors.description}
          errorMsg={errors.description?.message}
          {...register('description', {
            maxLength: { value: 500, message: '연구실 소개는 500자 이하여야 합니다.' },
          })}
        />
        <div className={'flex flex-col gap-5'}>
          <div className={'flex items-center gap-3'}>
            <Text className={'text-[12px]! font-bold md:text-[16px]!'}>연구 분야</Text>
            <Text className={'text-muted-foreground! text-[12px] font-medium'}>
              {researchFields.length}/{RESEARCH_FIELD_MAX_COUNT}
            </Text>
          </div>
          <div className={'flex flex-wrap items-center gap-1.5'}>
            {!isResearchFieldLimitReached && (
              <div className={'border-border flex items-center gap-1 rounded-full border px-2 py-1'}>
                <Input
                  value={fieldDraft}
                  onChange={e => setFieldDraft(e.target.value.slice(0, RESEARCH_FIELD_MAX_LENGTH))}
                  maxLength={RESEARCH_FIELD_MAX_LENGTH}
                  placeholder={'예) 무선 네트워크'}
                  className={'h-auto border-none px-1 py-0 text-[12px]! md:text-[14px]!'}
                  disabled={isPending}
                  onCompositionStart={() => {
                    isComposingRef.current = true
                  }}
                  onCompositionEnd={handleCompositionEnd}
                  onKeyDown={e => {
                    if (e.key !== 'Enter') return
                    e.preventDefault()
                    // 한글 조합 중 Enter 는 조합 확정용이라 건너뜀
                    if (e.nativeEvent.isComposing || isComposingRef.current || e.keyCode === 229) return
                    handleAddField()
                  }}
                />
                <button
                  type={'button'}
                  onClick={handleAddField}
                  disabled={isPending || fieldDraft.trim() === ''}
                  className={
                    'bg-muted shrink-0 rounded-full px-2.5 py-1 text-[12px] leading-5 font-medium disabled:opacity-50 md:text-[14px]'
                  }
                >
                  + 추가
                </button>
              </div>
            )}
            {researchFields.map(field => (
              <Tag.Lab
                key={field}
                className={'flex items-center gap-0.75'}
                Icon={
                  <button
                    type={'button'}
                    aria-label={`${field} 삭제`}
                    disabled={isPending}
                    className={'hover:text-error cursor-pointer'}
                    onClick={() => removeResearchField(field)}
                  >
                    <X className={'h-4 w-4'} />
                  </button>
                }
              >
                {field}
              </Tag.Lab>
            ))}
          </div>
        </div>
      </div>

      <Button type={'submit'} className={'mt-5 text-[12px]! md:text-[16px]!'} disabled={!isValid || isPending}>
        {isPending ? '수정 중...' : '연구실 정보 수정하기'}
      </Button>
    </form>
  )
}
