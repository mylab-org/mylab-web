'use client'

import { MessageCircle, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import { MoreUserPostDetailModal } from '../modal/more-user-post-detail-modal'
import type { UsersMePostsResponseType } from '@/entities/user/model/types'
import { useUsersMePostsListHook } from '@/entities/user/model/use-users-me-posts-list-hook'
import { formatRelativeDate } from '@/shared/lib/format'
import { useIntersectionObserver } from '@/shared/model'
import { Text } from '@/shared/ui/override/text'

type PostRowProps = {
  post: UsersMePostsResponseType
  onClick: () => void
}

const PostRow = ({ post, onClick }: PostRowProps) => {
  return (
    <button
      type={'button'}
      onClick={onClick}
      className={'hover:bg-muted flex w-full flex-col gap-1.5 rounded-[12px] px-1 py-3 text-left transition-colors'}
    >
      <div className={'flex items-center justify-between gap-2'}>
        <Text className={'text-brand! text-[12px] font-semibold'}>{post.categoryName}</Text>
        <Text className={'text-subtle-foreground! shrink-0 text-[11px]'}>{formatRelativeDate(post.createdAt)}</Text>
      </div>
      <Text className={'text-foreground! line-clamp-1 text-[14px] font-semibold md:text-[15px]'}>{post.title}</Text>
      <Text className={'text-muted-foreground! line-clamp-2 text-[12px] font-normal md:text-[13px]'}>
        {post.content}
      </Text>
      <div className={'text-subtle-foreground! flex items-center gap-3 text-[11px]'}>
        <span className={'flex items-center gap-1'}>
          <ThumbsUp className={'h-3 w-3'} />
          {post.likeCount}
        </span>
        <span className={'flex items-center gap-1'}>
          <MessageCircle className={'h-3 w-3'} />
          {post.commentCount}
        </span>
      </div>
    </button>
  )
}

export const MoreUserPosts = () => {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null)
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | undefined>()
  const { posts, isPending, isError, handleFetchNextPage, hasNextPage, isFetchingNextPage } = useUsersMePostsListHook()

  const nextPageTriggerRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: handleFetchNextPage,
    enabled: Boolean(hasNextPage) && !isFetchingNextPage,
  })

  if (isPending) {
    return (
      <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 overflow-auto px-5 pb-5 lg:w-[550px] lg:px-7.5'}>
        <Text className={'text-subtle-foreground! text-[13px]'}>불러오는 중...</Text>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 overflow-auto px-5 pb-5 lg:w-[550px] lg:px-7.5'}>
        <Text className={'text-error! text-[13px]'}>작성한 글을 불러오지 못했습니다.</Text>
      </div>
    )
  }

  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 overflow-auto px-5 pb-5 lg:w-[550px] lg:px-7.5'}>
      <Text className={'text-foreground! text-[14px] font-medium'}>{`총 ${posts.length}개`}</Text>
      {posts.length === 0 ? (
        <Text className={'text-subtle-foreground! py-8 text-center text-[13px]'}>작성한 글이 없습니다.</Text>
      ) : (
        <div className={'divide-border flex flex-col divide-y'}>
          {posts.map(post => (
            <PostRow
              key={post.id}
              post={post}
              onClick={() => {
                setSelectedPostId(post.id)
                setSelectedCategoryName(post.categoryName)
              }}
            />
          ))}
          <div ref={nextPageTriggerRef} className={'h-4 w-full'} aria-hidden />
          {isFetchingNextPage && (
            <Text className={'text-subtle-foreground! py-2 text-center text-[12px]'}>더 불러오는 중...</Text>
          )}
        </div>
      )}

      <MoreUserPostDetailModal
        open={selectedPostId !== null}
        postId={selectedPostId}
        categoryName={selectedCategoryName}
        onOpenChange={open => {
          if (!open) {
            setSelectedPostId(null)
            setSelectedCategoryName(undefined)
          }
        }}
      />
    </div>
  )
}
