'use client'

import { useQuery } from '@tanstack/react-query'
import { Suspense, useState } from 'react'
import { BoardUpdateModal } from '../../modal/board-update-modal'
import { BoardItem } from '@/entities/board'
import { getBoardList } from '@/entities/board/api/get-board-list'
import type { PostType } from '@/entities/board/model/types'
import { CommentItem } from '@/entities/comment'
import { BoardContentMenu, useBoardCategoryIdHook } from '@/features/board'
import { useBoardItemMenuHook } from '@/features/board/model/use-board-item-menu-hook'
import { CommentAddForm } from '@/features/comment'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { Text } from '@/shared/ui/override/text'
import { useBoardCommentHook } from '@/widgets/board/model/use-board-comment-hook'

type BoardPostCommentsProps = {
  post: PostType
}

const BoardPostComments = ({ post }: BoardPostCommentsProps) => {
  const { postId, comments, handleDeleteComment, isDeletePending, replyTarget, setReplyTarget, clearReplyTarget } =
    useBoardCommentHook({ post })

  return (
    <div className={'flex flex-col gap-1.25'}>
      <CommentAddForm postId={postId} replyTarget={replyTarget} onClearReplyTarget={clearReplyTarget} />
      <div className={'flex flex-col gap-1'}>
        {comments.map(comment => (
          <div key={comment.id} className={'flex flex-col gap-1'}>
            <CommentItem
              comment={comment}
              labName={post.lab.name}
              replyFn={() => setReplyTarget({ parentId: comment.id, name: comment.author.name })}
              deleteFn={() => handleDeleteComment(comment.id)}
              isDeletePending={isDeletePending}
            />
            {/* 대댓글 영역 */}
            {comment.replies.length > 0 && (
              <div className={'flex flex-col gap-2.5 rounded-[12px] bg-gray-50 px-5 py-2.5'}>
                {comment.replies.map(reply => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    labName={post.lab.name}
                    replyFn={() => setReplyTarget({ parentId: comment.id, name: reply.author.name })}
                    deleteFn={() => handleDeleteComment(reply.id)}
                    isDeletePending={isDeletePending}
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
  const { categoryId } = useBoardCategoryIdHook()
  const { handleDeleteBoardItem, isDeletePending } = useBoardItemMenuHook()
  const [editingPost, setEditingPost] = useState<PostType | null>(null)
  const [openCommentPostIds, setOpenCommentPostIds] = useState<PostType['id'][]>([])

  const toggleComment = (postId: PostType['id']) => {
    setOpenCommentPostIds(prev => (prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]))
  }

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
            commentFn={() => toggleComment(post.id)}
            updateFn={() => setEditingPost(post)}
            deleteFn={() => handleDeleteBoardItem(Number(post.id))}
            isDeletePending={isDeletePending}
          />
          {openCommentPostIds.includes(post.id) && <BoardPostComments post={post} />}
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
