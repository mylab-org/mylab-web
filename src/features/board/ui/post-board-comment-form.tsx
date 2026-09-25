'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Image } from 'next/dist/client/image-component'
import { useState, type FormEvent } from 'react'
import { postCommentCreate } from '@/features/comment/api/post-comment-create'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { Input } from '@/shared/ui/override/input'

type Props = {
  postId: number
  /** 대댓글인 경우 부모 댓글 id. 없으면 최상위 댓글 */
  parentId?: number
}

export const PostBoardCommentForm = ({ postId, parentId = 0 }: Props) => {
  const queryClient = useQueryClient()
  const [content, setContent] = useState('')

  const postCommentMutation = useMutation({
    mutationFn: () => postCommentCreate(postId, { parentId, content }),
    onSuccess: () => {
      setContent('')
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COMMENT.LIST(postId) })
    },
    onError: () => {
      console.error('Failed to create comment')
    },
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = content.trim()
    if (!trimmed || postCommentMutation.isPending) return
    postCommentMutation.mutate()
  }

  return (
    <form className={'flex gap-2.5 rounded-[8px] bg-gray-100 px-3.75 py-1.25'} onSubmit={handleSubmit}>
      <Input
        type="text"
        className={'w-full border-none text-[12px] md:text-[12px]'}
        placeholder={'댓글을 달아보세요'}
        value={content}
        onChange={event => setContent(event.target.value)}
        disabled={postCommentMutation.isPending}
      />
      <button type="submit" disabled={postCommentMutation.isPending || !content.trim()} className={'shrink-0'}>
        <Image src={'/icon/icon_board_reply.svg'} alt={'댓글 등록'} width={16} height={16} />
      </button>
    </form>
  )
}
