'use client'

import { useQuery } from '@tanstack/react-query'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { BoardItemSection } from './board-item-section'
import { BoardNoticeBanner } from './board-notice-banner'
import { getBoardCategory } from '@/entities/board/api/get-board-category'
import { useUsersMeHook } from '@/entities/user'
import { BoardCreateForm, useBoardCategoryIdHook } from '@/features/board'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'

type BoardContentSectionProps = {
  variant?: 'pc' | 'mobile'
}

export const BoardContentSection = ({ variant = 'pc' }: BoardContentSectionProps) => {
  const isMobile = variant === 'mobile'
  const [isPostFormOpen, setIsPostFormOpen] = useState(false)
  const { categoryId } = useBoardCategoryIdHook()
  const { me } = useUsersMeHook()
  const labId = me?.lab?.labId

  const { data: boardCategory } = useQuery({
    queryKey: QUERY_KEYS.BOARD.CATEGORY(labId ?? 0),
    queryFn: () => getBoardCategory(labId ?? 0),
    enabled: labId !== undefined,
  })

  const categoryName = [...(boardCategory?.service ?? []), ...(boardCategory?.lab ?? [])].find(
    menu => Number(menu.category_id) === categoryId,
  )?.category_name

  const openWriteForm = () => setIsPostFormOpen(true)

  return (
    <section className={cn('flex min-w-0 flex-1 flex-col gap-3', isMobile ? 'gap-3' : 'gap-3.5')}>
      <button
        type="button"
        className={cn(
          'flex cursor-pointer items-center gap-2.5 rounded-[14px] border px-4 py-3 transition-colors',
          'border-brand/30 bg-brand/5 hover:bg-brand/10',
        )}
        onClick={() => setIsPostFormOpen(prev => !prev)}
      >
        <Text className={'text-brand! w-full text-left text-[13px] font-medium md:text-[15px]'}>
          {categoryName ? `${categoryName}에 새 소식을 전해보세요!` : '새 소식을 전해보세요!'}
        </Text>
        <Pencil className="text-brand h-4 w-4 shrink-0 md:h-5 md:w-5" />
      </button>
      {isPostFormOpen && <BoardCreateForm onClose={() => setIsPostFormOpen(false)} />}

      <BoardNoticeBanner />

      <div className={'flex flex-1 flex-col gap-3'}>
        <BoardItemSection onWriteClick={openWriteForm} />
      </div>
    </section>
  )
}
