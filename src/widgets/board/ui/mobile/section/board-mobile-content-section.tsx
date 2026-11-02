'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { BoardContentSection } from '../../pc/section/board-content-section'
import { getBoardCategory } from '@/entities/board/api/get-board-category'
import { useUsersMeHook } from '@/entities/user'
import { useBoardCategoryIdHook } from '@/features/board'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { BASE_PATHS } from '@/shared/constant/routes'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'

export const BoardMobileContentSection = () => {
  const { categoryId } = useBoardCategoryIdHook()
  const { me } = useUsersMeHook()
  const labId = me?.lab?.labId

  const { data: boardCategory } = useQuery({
    queryKey: QUERY_KEYS.BOARD.CATEGORY(labId ?? 0),
    queryFn: () => getBoardCategory(labId ?? 0),
    enabled: labId !== undefined,
  })

  const serviceCategory = boardCategory?.service.find(menu => Number(menu.category_id) === categoryId)
  const labCategory = boardCategory?.lab.find(menu => Number(menu.category_id) === categoryId)
  const categoryName = serviceCategory?.category_name ?? labCategory?.category_name
  const categoryGroupLabel = serviceCategory ? '공유 카테고리' : labCategory ? '우리 연구실 메뉴' : undefined

  return (
    <section className={'flex flex-1 flex-col gap-3'}>
      <div className={'flex items-center gap-4'}>
        <Link href={BASE_PATHS.BOARD} aria-label={'카테고리 목록으로'} className={'mt-0.5 shrink-0 text-gray-900'}>
          <ChevronLeftIcon className={'h-6 w-6'} />
        </Link>
        <div className={'flex min-w-0 flex-col'}>
          {categoryGroupLabel && <Text className={'text-[11px] font-medium text-gray-400!'}>{categoryGroupLabel}</Text>}
          <Text className={'truncate text-[16px] font-semibold'}>{categoryName}</Text>
        </div>
      </div>

      <div className={cn('flex flex-1 flex-col rounded-[20px] bg-white p-4', CARD_SHADOW)}>
        <BoardContentSection variant={'mobile'} />
      </div>
    </section>
  )
}
