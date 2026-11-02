'use client'

import { useQuery } from '@tanstack/react-query'
import { getBoardCategory } from '@/entities/board/api/get-board-category'
import { useUsersMeHook } from '@/entities/user'
import { useBoardCategoryIdHook } from '@/features/board'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui/override/button'

type BoardMenuWrapperProps = {
  variant?: 'pc' | 'mobile'
}

export const BoardMenuWrapper = ({ variant = 'pc' }: BoardMenuWrapperProps) => {
  const isMobile = variant === 'mobile'
  const { categoryId, isCategorySelected, setCategoryId } = useBoardCategoryIdHook()
  const { me } = useUsersMeHook()
  const labId = me?.lab?.labId

  const { data: boardCategory } = useQuery({
    queryKey: QUERY_KEYS.BOARD.CATEGORY(labId ?? 0),
    queryFn: () => getBoardCategory(labId ?? 0),
    enabled: labId !== undefined,
  })

  const renderMenuButton = (menu: { category_id: string; category_name: string }) => {
    const isActive = isCategorySelected && Number(menu.category_id) === categoryId

    return (
      <Button.Setup
        key={menu.category_id}
        className={cn(
          'w-full rounded-[10px] text-left!',
          isMobile ? 'min-h-11 px-3 py-3 text-[14px]!' : 'px-2.5 py-2 text-[14px]!',
          isActive ? 'bg-[#2562CD]/10 text-[#2562CD]!' : 'text-gray-600!',
        )}
        isActive={isActive}
        onClick={() => setCategoryId(menu.category_id)}
      >
        {menu.category_name}
      </Button.Setup>
    )
  }

  if (isMobile) {
    return (
      <section className={'flex flex-1 flex-col gap-4'}>
        <div className={cn('flex flex-col gap-2 rounded-[20px] bg-white p-4', CARD_SHADOW)}>
          <h3 className={'px-1 text-[12px] font-semibold text-gray-400!'}>공유 카테고리</h3>
          <div className={'flex flex-col gap-1'}>{boardCategory?.service.map(renderMenuButton)}</div>
        </div>
        <div className={cn('flex flex-col gap-2 rounded-[20px] bg-white p-4', CARD_SHADOW)}>
          <h3 className={'px-1 text-[12px] font-semibold text-gray-400!'}>우리 연구실 메뉴</h3>
          <div className={'flex flex-col gap-1'}>{boardCategory?.lab.map(renderMenuButton)}</div>
        </div>
      </section>
    )
  }

  return (
    <section className={'flex flex-1 flex-col gap-4'}>
      <div className={'flex flex-col gap-1.5'}>
        <h3 className={'px-1.5 text-[12px] font-semibold text-gray-400!'}>공유 카테고리</h3>
        {boardCategory?.service.map(renderMenuButton)}
      </div>
      <div className={'flex flex-col gap-1.5 border-t border-gray-100 pt-4'}>
        <h3 className={'px-1.5 text-[12px] font-semibold text-gray-400!'}>우리 연구실 메뉴</h3>
        {boardCategory?.lab.map(renderMenuButton)}
      </div>
    </section>
  )
}
