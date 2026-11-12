'use client'
'use no memo'

import { X } from 'lucide-react'
import { useRef, useState } from 'react'
import type { LabsDetailResponseType } from '@/entities/labs/model/types'
import { RESEARCH_FIELD_MAX_COUNT, useLabsUpdateFormHook } from '@/features/labs'
import { Button } from '@/shared/ui/override/button'
import { Input } from '@/shared/ui/override/input'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'

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

  const handleAddField = () => {
    if (!addResearchField(fieldDraft)) return

    setFieldDraft('')
    // 조합 중에 비우면 compositionend 가 마지막 글자를 되돌려 넣으므로 한 번 더 비워야 한다
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
        <div className={'w-full'}>
          <Text className={'text-[12px] md:text-[16px]'}>연구실 이름</Text>
          <Input
            placeholder={'연구실 이름'}
            className={'w-full'}
            aria-invalid={!!errors.labName}
            {...register('labName', {
              required: '연구실 이름을 입력해주세요.',
              minLength: { value: 2, message: '연구실 이름은 최소 2자 이상이어야 합니다.' },
            })}
          />
          {errors.labName && <Text className={'text-error text-[12px]'}>{errors.labName.message}</Text>}
        </div>

        <div className={'w-full'}>
          <Text className={'text-[12px] md:text-[16px]'}>연구실 소개</Text>
          <Input
            placeholder={'연구실 소개'}
            className={'w-full'}
            aria-invalid={!!errors.description}
            {...register('description', {
              maxLength: { value: 500, message: '연구실 소개는 500자 이하여야 합니다.' },
            })}
          />
          {errors.description && <Text className={'text-error text-[12px]'}>{errors.description.message}</Text>}
        </div>

        <div className={'flex flex-col gap-5'}>
          <div className={'flex items-baseline gap-1.5'}>
            <Text className={'text-[12px]! font-bold md:text-[16px]!'}>연구 분야</Text>
            <Text className={'text-subtle-foreground! text-[11px] font-medium md:text-[13px]!'}>
              {researchFields.length} / {RESEARCH_FIELD_MAX_COUNT}
            </Text>
          </div>

          <div className={'flex items-center gap-2'}>
            <Input
              value={fieldDraft}
              placeholder={'예) 무선 네트워크'}
              className={'flex-1'}
              onChange={e => setFieldDraft(e.target.value)}
              onCompositionStart={() => {
                isComposingRef.current = true
              }}
              onCompositionEnd={handleCompositionEnd}
              // form 안이라 Enter 가 전체 제출로 번지지 않게 막습니다.
              onKeyDown={e => {
                if (e.key !== 'Enter') return
                e.preventDefault()
                // 한글 조합 중 Enter 는 조합을 확정하는 키라 태그 추가를 건너뛴다
                if (e.nativeEvent.isComposing || isComposingRef.current || e.keyCode === 229) return
                handleAddField()
              }}
            />
            <button
              type={'button'}
              className={'bg-muted text-muted-foreground hover:bg-secondary cursor-pointer rounded-full px-3 py-1'}
              onClick={handleAddField}
            >
              <Text className={'text-[12px] leading-5 font-medium md:text-[14px]'}>+ 추가하기</Text>
            </button>
          </div>

          {researchFields.length === 0 ? (
            <Text className={'text-subtle-foreground! text-[12px] md:text-[14px]'}>등록된 연구 분야가 없습니다</Text>
          ) : (
            <div className={'flex flex-wrap gap-1.5'}>
              {researchFields.map(field => (
                <Tag.Lab
                  key={field}
                  className={'flex items-center gap-0.75'}
                  Icon={
                    <button
                      type={'button'}
                      aria-label={`${field} 삭제`}
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
          )}
        </div>
      </div>

      <Button type={'submit'} className={'mt-5 text-[12px]! md:text-[16px]!'} disabled={!isValid || isPending}>
        {isPending ? '수정 중...' : '연구실 정보 수정하기'}
      </Button>
    </form>
  )
}
