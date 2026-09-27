'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { postCommentCreate } from '../api/post-comment-create'
import { QUERY_KEYS } from '@/shared/api/query-key'
import type { CommentReplyTargetType, PostCommentCreatePayloadType } from './types'

type Props = {
  postId: number
  parentId?: number
  replyTarget?: CommentReplyTargetType | null
  onClearReplyTarget?: () => void
}

export const useCommentAddFormHook = ({ postId, parentId = 0, replyTarget, onClearReplyTarget }: Props) => {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    watch,
    formState: { isValid },
  } = useForm<PostCommentCreatePayloadType>({
    defaultValues: {
      content: '',
    },
    mode: 'onChange',
  })

  const replyTag = replyTarget ? `@${replyTarget.name}` : ''
  const prevContentRef = useRef('')

  // 댓글 달기 클릭 → 입력창 앞에 태그 삽입
  useEffect(() => {
    if (!replyTag) return
    prevContentRef.current = `${replyTag} `
    setValue('content', `${replyTag} `, { shouldValidate: true })
    setFocus('content')
  }, [replyTag, setValue, setFocus])

  // 입력창에서 태그가 훼손되면 일반 댓글로 전환
  useEffect(() => {
    if (!replyTag) return
    const tagText = `${replyTag} `
    const subscription = watch(({ content = '' }) => {
      const prevContent = prevContentRef.current
      prevContentRef.current = content
      if (content.startsWith(tagText)) return

      // 태그 영역에서 글자가 지워진 경우 → 태그 전체를 한 번에 삭제하고 뒤의 입력 내용만 남김
      // (키 이벤트 대신 값 비교로 판단해야 모바일 가상 키보드·잘라내기에서도 동일하게 동작)
      const removedLength = prevContent.length - content.length
      let prefixLength = 0
      while (prefixLength < content.length && content[prefixLength] === prevContent[prefixLength]) prefixLength++
      const isDeletionInTag =
        removedLength > 0 &&
        prefixLength < tagText.length &&
        content.slice(prefixLength) === prevContent.slice(prefixLength + removedLength)

      subscription.unsubscribe()
      if (isDeletionInTag) {
        const restContent = prevContent.slice(Math.max(tagText.length, prefixLength + removedLength)).trimStart()
        setValue('content', restContent, { shouldValidate: true })
      }
      onClearReplyTarget?.()
    })
    return () => subscription.unsubscribe()
  }, [replyTag, watch, setValue, onClearReplyTarget])

  const postCommentMutation = useMutation({
    mutationFn: (content: string) =>
      postCommentCreate(postId, { parentId: Number(replyTarget?.parentId ?? parentId), content }),
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COMMENT.LIST(postId) })
    },
    onError: () => {
      console.error('Failed to create comment')
    },
  })

  const onSubmit = handleSubmit((data: PostCommentCreatePayloadType) => {
    // 태그는 표시용이라 전송 내용에서 제외
    const content = replyTag ? data.content.slice(replyTag.length).trim() : data.content
    const trimmed = content.trim()
    if (!trimmed || postCommentMutation.isPending) return
    postCommentMutation.mutate(content)
  })

  return { register, onSubmit, isValid, isPending: postCommentMutation.isPending }
}
