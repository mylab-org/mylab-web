'use client'

import { useParams, useRouter } from 'next/navigation'
import { DEFAULT_BOARD_CATEGORY_ID } from './constants'
import { BASE_PATHS } from '@/shared/constant/routes'

export const useBoardCategoryIdHook = () => {
  const router = useRouter()
  const params = useParams<{ categoryId?: string }>()

  const rawCategoryId = params.categoryId
  const categoryId = Number(rawCategoryId ?? DEFAULT_BOARD_CATEGORY_ID)

  const setCategoryId = (nextCategoryId: string | number) => {
    router.push(`${BASE_PATHS.BOARD}/${nextCategoryId}`)
  }

  return {
    categoryId: Number.isFinite(categoryId) ? categoryId : DEFAULT_BOARD_CATEGORY_ID,
    isCategorySelected: rawCategoryId !== undefined,
    setCategoryId,
  }
}
