'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { DEFAULT_BOARD_CATEGORY_ID } from './constants'

export const useBoardCategoryId = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const rawCategoryId = searchParams.get('categoryId')
  const categoryId = Number(rawCategoryId ?? DEFAULT_BOARD_CATEGORY_ID)

  useEffect(() => {
    if (rawCategoryId) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('categoryId', String(DEFAULT_BOARD_CATEGORY_ID))
    router.replace(`${pathname}?${params.toString()}`)
  }, [pathname, rawCategoryId, router, searchParams])

  const setCategoryId = (nextCategoryId: string | number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('categoryId', String(nextCategoryId))
    router.push(`${pathname}?${params.toString()}`)
  }

  return {
    categoryId: Number.isFinite(categoryId) ? categoryId : DEFAULT_BOARD_CATEGORY_ID,
    setCategoryId,
  }
}
