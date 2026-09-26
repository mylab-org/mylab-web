'use client'

import { useQuery } from '@tanstack/react-query'
import { Suspense, useState } from 'react'
import { BoardUpdateModal } from '../../modal/board-update-modal'
import { BoardCommentItem, BoardItem } from '@/entities/board'
import { getBoardList } from '@/entities/board/api/get-board-list'
import type { PostType } from '@/entities/board/model/types'
import { getCommentList } from '@/entities/comment/api/get-comment-list'
import { BoardContentMenu, PostBoardCommentForm, useBoardCategoryId } from '@/features/board'
import { useBoardItemMenuHook } from '@/features/board/model/use-board-item-menu-hook'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { formatDateTime } from '@/shared/lib/format'
import { Text } from '@/shared/ui/override/text'

type BoardPostCommentsProps = {
  post: PostType
}

const BoardPostComments = ({ post }: BoardPostCommentsProps) => {
  const postId = Number(post.id)

  const { data: comments = [] } = useQuery({
    queryKey: QUERY_KEYS.COMMENT.LIST(postId),
    queryFn: () => getCommentList(postId),
    enabled: Number.isFinite(postId),
  })

  return (
    <div className={'flex flex-col gap-1.25'}>
      <PostBoardCommentForm postId={postId} />
      <div className={'flex flex-col gap-1'}>
        {comments.map(comment => (
          <div key={comment.id} className={'flex flex-col gap-1'}>
            <BoardCommentItem
              authorName={comment.author.name}
              content={comment.content}
              createdAt={formatDateTime(comment.created_at)}
              labName={post.lab.name}
            />
            {/* 대댓글 영역 */}
            {comment.replies.length > 0 && (
              <div className={'flex flex-col gap-2.5 rounded-[12px] bg-gray-50 px-5 py-2.5'}>
                {comment.replies.map(reply => (
                  <BoardCommentItem
                    key={reply.id}
                    authorName={reply.author.name}
                    content={reply.content}
                    createdAt={reply.created_at}
                    labName={post.lab.name}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const BoardItemSectionContent = () => {
  const { categoryId } = useBoardCategoryId()
  const { handleDeleteBoardItem, isDeletePending } = useBoardItemMenuHook()
  const [editingPost, setEditingPost] = useState<PostType | null>(null)

  const { data: boardList, isPending } = useQuery({
    queryKey: QUERY_KEYS.BOARD.LIST(categoryId),
    queryFn: () => getBoardList(categoryId),
  })

  if (isPending) {
    return <Text className={'text-[14px] text-gray-400!'}>게시글을 불러오는 중...</Text>
  }

  if (!boardList?.posts.length) {
    return <Text className={'text-[14px] text-gray-400!'}>게시글이 없습니다.</Text>
  }

  return (
    <>
      {boardList.posts.map(post => (
        <div key={post.id} className={'flex flex-col gap-1 border-b border-gray-200 py-2.5'}>
          <BoardItem post={post} />
          {/* 댓글 영역 */}
          <BoardContentMenu
            commentCount={post.commentCount}
            createdAt={post.created_at}
            updateFn={() => setEditingPost(post)}
            deleteFn={() => handleDeleteBoardItem(Number(post.id))}
            isDeletePending={isDeletePending}
          />
          <BoardPostComments post={post} />
        </div>
      ))}
      <BoardUpdateModal
        open={editingPost !== null}
        post={editingPost}
        onOpenChange={open => {
          if (!open) setEditingPost(null)
        }}
      />
    </>
  )
}

export const BoardItemSection = () => {
  return (
    <Suspense fallback={null}>
      <BoardItemSectionContent />
    </Suspense>
  )
}
