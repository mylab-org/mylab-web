'use client'

import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useForm } from 'react-hook-form'
import { patchLabsInfo } from '../api/patch-labs-info'
import { MAX_HASHTAG_COUNT, MAX_HASHTAG_LENGTH } from '../config/const'
import type { LabInfoResponseType } from '@/entities/labs/model/types'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import { useSideModalStore } from '@/shared/store'
import type { PatchLabsInfoPayloadType } from './types'

export const useLabsInfoUpdateFormHook = (labInfo: LabInfoResponseType) => {
  const closeSideModal = useSideModalStore(state => state.closeSideModal)
  const labId = labInfo.labId
  const [hashtagInput, setHashtagInput] = useState('')
  const isComposingRef = useRef(false)
  const clearAfterCompositionRef = useRef(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<PatchLabsInfoPayloadType>({
    defaultValues: {
      labName: labInfo.labName,
      description: labInfo.description,
      hashtags: labInfo.hashtags,
    },
    mode: 'onChange',
  })

  const hashtags = watch('hashtags')

  useEffect(() => {
    reset({
      labName: labInfo.labName,
      description: labInfo.description,
      hashtags: labInfo.hashtags,
    })
  }, [labInfo, reset])

  const patchLabsInfoMutation = useApiMutation({
    mutationFn: (payload: PatchLabsInfoPayloadType) => patchLabsInfo(labId, payload),
    successMessage: '연구실 정보가 수정되었습니다.',
    defaultErrorMessage: '연구실 정보 수정에 실패했습니다.',
    invalidateQueryKeys: [QUERY_KEYS.LABS.LAB_INFO(labId)],
    onSuccess: () => {
      closeSideModal()
    },
  })

  const isHashtagLimitReached = hashtags.length >= MAX_HASHTAG_COUNT

  const clearHashtagInput = () => {
    setHashtagInput('')
    // 한글 IME가 compositionend에서 마지막 글자를 다시 넣는 경우를 막음
    clearAfterCompositionRef.current = true
  }

  const handleHashtagInputChange = (value: string) => {
    setHashtagInput(value.slice(0, MAX_HASHTAG_LENGTH))
  }

  const addHashtag = () => {
    if (isHashtagLimitReached) return
    const next = hashtagInput.trim().replace(/^#/, '').slice(0, MAX_HASHTAG_LENGTH)
    if (!next) return
    if (hashtags.includes(next)) {
      clearHashtagInput()
      return
    }
    setValue('hashtags', [...hashtags, next], { shouldValidate: true, shouldDirty: true })
    clearHashtagInput()
  }

  const handleHashtagKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    // 한글 조합 중 Enter는 조합 종료용이라 태그 추가를 건너뜀
    if (e.nativeEvent.isComposing || isComposingRef.current || e.keyCode === 229) return
    addHashtag()
  }

  const handleHashtagCompositionStart = () => {
    isComposingRef.current = true
  }

  const handleHashtagCompositionEnd = () => {
    isComposingRef.current = false
    if (clearAfterCompositionRef.current) {
      setHashtagInput('')
      clearAfterCompositionRef.current = false
    }
  }

  const removeHashtag = (tag: string) => {
    setValue(
      'hashtags',
      hashtags.filter(item => item !== tag),
      { shouldValidate: true, shouldDirty: true },
    )
  }

  const onSubmit = handleSubmit(data => {
    patchLabsInfoMutation.mutate({
      labName: data.labName.trim(),
      description: data.description.trim(),
      hashtags: data.hashtags,
    })
  })

  return {
    labInfo,
    register,
    hashtags,
    hashtagInput,
    handleHashtagInputChange,
    maxHashtagLength: MAX_HASHTAG_LENGTH,
    addHashtag,
    handleHashtagKeyDown,
    handleHashtagCompositionStart,
    handleHashtagCompositionEnd,
    removeHashtag,
    isHashtagLimitReached,
    maxHashtagCount: MAX_HASHTAG_COUNT,
    onSubmit,
    isValid,
    isPending: patchLabsInfoMutation.isPending,
  }
}
