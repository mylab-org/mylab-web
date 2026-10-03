'use client'

import { Suspense } from 'react'
import { BoardUpdateModal } from '../../modal/board-update-modal'
import { BoardItem } from '@/entities/board'
import type { PostType } from '@/entities/board/model/types'
import { CommentItem } from '@/entities/comment'
import type { CommentType } from '@/entities/comment/model/types'
import { BoardItemNav } from '@/features/board'
import { CommentAddForm, CommentUpdateForm } from '@/features/comment'
import { useIntersectionObserver } from '@/shared/model'
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

  // 글쓴이 댓글 표시 — 내 게시글에 내가 단 댓글이고, 게시글과 댓글의 익명 여부가 같을 때만
  // (실명 게시글엔 실명 댓글, 익명 게시글엔 익명 댓글)
  const isWriterComment = (target: CommentType) =>
    post.isMine && target.isMine && post.isAnonymous === target.isAnonymous

  return (
    <div className={'flex flex-col gap-1.25'}>
      <CommentAddForm postId={postId} replyTarget={replyTarget} onClearReplyTarget={clearReplyTarget} />
      <div className={'flex flex-col gap-1'}>
        {comments.map(comment => (
          <div key={comment.cid} className={'flex flex-col gap-1'}>
            <CommentItem
              isWriter={isWriterComment(comment)}
              comment={comment}
              replyFn={() =>
                setReplyTarget({ parentId: comment.cid, name: comment.author.name, isAnonymous: comment.isAnonymous })
              }
              updateFn={() => toggleEditComment(comment.cid)}
              isEditing={editingCommentId === comment.cid}
              updateForm={<CommentUpdateForm postId={postId} comment={comment} onClose={closeEditComment} />}
              deleteFn={() => handleDeleteComment(comment.cid)}
              isDeletePending={isDeletePending}
            />
            {/* 대댓글 영역 */}
            {comment.replies.length > 0 && (
              <div className={'flex flex-col gap-2.5 rounded-[12px] bg-gray-50 px-5 py-2.5'}>
                {comment.replies.map(reply => (
                  <CommentItem
                    isWriter={isWriterComment(reply)}
                    key={reply.cid}
                    comment={reply}
                    replyFn={() =>
                      setReplyTarget({
                        parentId: comment.cid,
                        name: reply.author.name,
                        isAnonymous: reply.isAnonymous,
                      })
                    }
                    updateFn={() => toggleEditComment(reply.cid)}
                    isEditing={editingCommentId === reply.cid}
                    updateForm={
                      <CommentUpdateForm
                        postId={postId}
                        parentId={comment.cid}
                        onClose={closeEditComment}
                        comment={reply}
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
    posts,
    isPending,
    handleFetchNextPage,
    hasNextPage,
    isFetchingNextPage,
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

  // 목록 끝 요소가 보이면 다음 페이지 요청
  const nextPageTriggerRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: handleFetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
    rootMargin: '200px',
  })

  if (isPending) {
    return <Text className={'text-[14px] text-gray-400!'}>게시글을 불러오는 중...</Text>
  }

  if (!posts.length) {
    return <Text className={'text-[14px] text-gray-400!'}>게시글이 없습니다.</Text>
  }

  return (
    <>
      {posts.map(post => (
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
      <div ref={nextPageTriggerRef} />
      {isFetchingNextPage && <Text className={'text-[14px] text-gray-400!'}>게시글을 불러오는 중...</Text>}
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
