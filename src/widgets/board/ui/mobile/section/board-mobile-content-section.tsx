'use client'

import { useQuery } from '@tanstack/react-query'
import { ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { BoardContentSection } from '../../pc/section/board-content-section'
import { getBoardCategory } from '@/entities/board/api/get-board-category'
import { useBoardCategoryIdHook } from '@/features/board'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { BASE_PATHS } from '@/shared/constant/routes'
import { Text } from '@/shared/ui/override/text'

/** 테스트용 labId */
const TEST_LAB_ID = 1

export const BoardMobileContentSection = () => {
  const { categoryId } = useBoardCategoryIdHook()

  const { data: boardCategory } = useQuery({
    queryKey: QUERY_KEYS.BOARD.CATEGORY(TEST_LAB_ID),
    queryFn: () => getBoardCategory(TEST_LAB_ID),
  })

  const categoryName = [...(boardCategory?.service ?? []), ...(boardCategory?.lab ?? [])].find(
    menu => Number(menu.category_id) === categoryId,
  )?.category_name

  return (
    <section className={'flex flex-1 flex-col gap-2.5'}>
      <div className={'flex items-center gap-1'}>
        <Link href={BASE_PATHS.BOARD} aria-label={'카테고리 목록으로'} className={'text-gray-900'}>
          <ChevronLeftIcon className={'h-6 w-6'} />
        </Link>
        <Text className={'text-[16px] font-semibold'}>{categoryName}</Text>
      </div>
      <BoardContentSection />
    </section>
  )
}
