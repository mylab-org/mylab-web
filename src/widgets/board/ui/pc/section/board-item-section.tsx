'use client'

import { Suspense } from 'react'
import { BoardUpdateModal } from '../../modal/board-update-modal'
import { BoardItem } from '@/entities/board'
import type { PostType } from '@/entities/board/model/types'
import { CommentItem } from '@/entities/comment'
import { BoardItemNav } from '@/features/board'
import { CommentAddForm, CommentUpdateForm } from '@/features/comment'
import { Text } from '@/shared/ui/override/text'
import { useBoardCommentHook } from '@/widgets/board/model/use-board-comment-hook'
import { useBoardListHook } from '@/widgets/board/model/use-board-list-hook'

type BoardPostCommentsProps = {
  post: PostType
}

const BoardPostComments = ({ post }: BoardPostCommentsProps) => {
  const {
    postId,
    comments,
    handleDeleteComment,
    isDeletePending,
    replyTarget,
    setReplyTarget,
    clearReplyTarget,
    editingCommentId,
    toggleEditComment,
    closeEditComment,
  } = useBoardCommentHook({ post })

  return (
    <div className={'flex flex-col gap-1.25'}>
      <CommentAddForm postId={postId} replyTarget={replyTarget} onClearReplyTarget={clearReplyTarget} />
      <div className={'flex flex-col gap-1'}>
        {comments.map(comment => (
          <div key={comment.cid} className={'flex flex-col gap-1'}>
            <CommentItem
              comment={comment}
              replyFn={() => setReplyTarget({ parentId: comment.cid, name: comment.author.name })}
              updateFn={() => toggleEditComment(comment.cid)}
              isEditing={editingCommentId === comment.cid}
              updateForm={
                <CommentUpdateForm
                  postId={postId}
                  commentId={comment.cid}
                  defaultContent={comment.content}
                  onClose={closeEditComment}
                />
              }
              deleteFn={() => handleDeleteComment(comment.cid)}
              isDeletePending={isDeletePending}
            />
            {/* 대댓글 영역 */}
            {comment.replies.length > 0 && (
              <div className={'flex flex-col gap-2.5 rounded-[12px] bg-gray-50 px-5 py-2.5'}>
                {comment.replies.map(reply => (
                  <CommentItem
                    key={reply.cid}
                    comment={reply}
                    replyFn={() => setReplyTarget({ parentId: comment.cid, name: reply.author.name })}
                    updateFn={() => toggleEditComment(reply.cid)}
                    isEditing={editingCommentId === reply.cid}
                    updateForm={
                      <CommentUpdateForm
                        postId={postId}
                        commentId={reply.cid}
                        parentId={comment.cid}
                        defaultContent={reply.content}
                        onClose={closeEditComment}
                      />
                    }
                    deleteFn={() => handleDeleteComment(reply.cid)}
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
  const {
    boardList,
    isPending,
    isDeletePending,
    editingPost,
    setEditingPost,
    openCommentPostIds,
    toggleComment,
    handleDeleteBoardItem,
    handlePostBoardItemLike,
    handleDeleteBoardItemLike,
    isLikePending,
  } = useBoardListHook()

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
          <BoardItemNav
            post={post}
            commentFn={() => toggleComment(post.id)}
            updateFn={() => setEditingPost(post)}
            deleteFn={() => handleDeleteBoardItem(post.id)}
            isDeletePending={isDeletePending}
            likeFn={post.isLiked ? () => handleDeleteBoardItemLike(post.id) : () => handlePostBoardItemLike(post.id)}
            isLikePending={isLikePending}
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
