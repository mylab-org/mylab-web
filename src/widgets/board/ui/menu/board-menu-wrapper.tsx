'use client'

import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { Suspense } from 'react'
import { getBoardCategory } from '@/entities/board/api/get-board-category'
import { useBoardCategoryId } from '@/features/board'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { Button } from '@/shared/ui/override/button'

/** 테스트용 labId */
const TEST_LAB_ID = 1

type BoardMenuWrapperProps = {
  variant?: 'pc' | 'mobile'
}

const BoardMenuWrapperContent = ({ variant = 'pc' }: BoardMenuWrapperProps) => {
  const isMobile = variant === 'mobile'
  const { categoryId, setCategoryId } = useBoardCategoryId()

  const { data: boardCategory } = useQuery({
    queryKey: QUERY_KEYS.BOARD.CATEGORY(TEST_LAB_ID),
    queryFn: () => getBoardCategory(TEST_LAB_ID),
  })

  return (
    <section className={clsx('flex flex-col gap-2.5', isMobile ? 'flex-1 p-0' : 'w-[200px] p-2.5')}>
      <div className={'flex flex-col gap-2.5 border-b border-b-gray-200 pb-3.75'}>
        <h3 className={'px-1.5 text-[12px] font-semibold text-gray-400! md:text-[14px]'}>우리 연구실 메뉴</h3>
        {boardCategory?.lab.map(menu => (
          <Button.Setup
            key={menu.category_id}
            className={'rounded-[8px] text-left text-[14px]'}
            isActive={Number(menu.category_id) === categoryId}
            onClick={() => setCategoryId(menu.category_id)}
          >
            {menu.category_name}
          </Button.Setup>
        ))}
      </div>
      <div className={'flex flex-col gap-2.5 pt-3.75'}>
        <h3 className={'px-1.5 text-[12px] font-semibold text-gray-400! md:text-[14px]'}>공유 카테고리</h3>
        {boardCategory?.service.map(menu => (
          <Button.Setup
            key={menu.category_id}
            className={'rounded-[8px] text-left text-[14px]'}
            isActive={Number(menu.category_id) === categoryId}
            onClick={() => setCategoryId(menu.category_id)}
          >
            {menu.category_name}
          </Button.Setup>
        ))}
      </div>
    </section>
  )
}

export const BoardMenuWrapper = ({ variant = 'pc' }: BoardMenuWrapperProps) => {
  return (
    <Suspense fallback={null}>
      <BoardMenuWrapperContent variant={variant} />
    </Suspense>
  )
}
