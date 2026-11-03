'use client'

import { BoardUpdateModal } from '../../modal/board-update-modal'
import { BoardItem } from '@/entities/board'
import type { PostType } from '@/entities/board/model/types'
import { CommentItem } from '@/entities/comment'
import type { CommentType } from '@/entities/comment/model/types'
import { BoardItemNav } from '@/features/board'
import { CommentAddForm, CommentUpdateForm } from '@/features/comment'
import { cn } from '@/shared/lib'
import { useIntersectionObserver } from '@/shared/model'
import { SkeletonCard, SkeletonLine, SkeletonTitle } from '@/shared/ui/override/skeleton'
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
    handleCommentAdded,
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
    <div className={'border-border mt-2 flex flex-col gap-1.25 border-t pt-3'}>
      <CommentAddForm
        postId={postId}
        replyTarget={replyTarget}
        onClearReplyTarget={clearReplyTarget}
        onSuccess={handleCommentAdded}
      />
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
            {comment.replies.length > 0 && (
              <div className={'bg-muted flex flex-col gap-2.5 rounded-[12px] px-4 py-2.5'}>
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

const BoardFeedSkeleton = () => (
  <div className={'flex flex-col gap-3'}>
    {Array.from({ length: 3 }).map((_, index) => (
      <SkeletonCard key={index} className={'rounded-[16px]'} padding="md">
        <SkeletonTitle width="w-40" />
        <SkeletonLine size="xs" width="w-32" />
        <SkeletonLine width="w-full" />
        <SkeletonLine width="w-4/5" />
      </SkeletonCard>
    ))}
  </div>
)

type BoardItemSectionProps = {
  onWriteClick?: () => void
}

export const BoardItemSection = ({ onWriteClick }: BoardItemSectionProps) => {
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

  const nextPageTriggerRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: handleFetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
    rootMargin: '200px',
  })

  if (isPending) {
    return <BoardFeedSkeleton />
  }

  if (!posts.length) {
    return (
      <div className={'border-border flex flex-col items-center gap-3 rounded-[16px] border border-dashed px-4 py-10'}>
        <Text className={'text-subtle-foreground! text-[14px] font-medium'}>아직 게시글이 없습니다.</Text>
        <Text className={'text-subtle-foreground! text-[12px]'}>첫 소식을 남겨 연구실 멤버와 공유해 보세요.</Text>
        {onWriteClick && (
          <button
            type={'button'}
            onClick={onWriteClick}
            className={'bg-brand mt-1 rounded-[10px] px-4 py-2 text-[13px] font-semibold text-white'}
          >
            글쓰기
          </button>
        )}
      </div>
    )
  }

  return (
    <>
      {posts.map(post => {
        const isCommentOpen = openCommentPostIds.includes(post.id)

        return (
          <article
            key={post.id}
            className={cn(
              'border-border bg-card flex flex-col gap-2 rounded-[16px] border p-4',
              isCommentOpen && 'border-brand/20',
            )}
          >
            <BoardItem post={post} />
            <BoardItemNav
              post={post}
              commentFn={() => toggleComment(post.id)}
              updateFn={() => setEditingPost(post)}
              deleteFn={() => handleDeleteBoardItem(post.id)}
              isDeletePending={isDeletePending}
              likeFn={post.isLiked ? () => handleDeleteBoardItemLike(post.id) : () => handlePostBoardItemLike(post.id)}
              isLikePending={isLikePending}
            />
            {isCommentOpen && <BoardPostComments post={post} />}
          </article>
        )
      })}
      <div ref={nextPageTriggerRef} />
      {isFetchingNextPage && (
        <Text className={'text-subtle-foreground! py-2 text-center text-[13px]'}>게시글을 불러오는 중...</Text>
      )}
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
