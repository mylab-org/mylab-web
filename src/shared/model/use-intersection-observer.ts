'use client'

import { useEffect, useRef } from 'react'

type Props = {
  onIntersect: () => void
  /** false면 관찰하지 않음 (다음 페이지가 없거나 요청 중일 때) */
  enabled?: boolean
  /** 화면 끝에 닿기 전 미리 감지할 여백 */
  rootMargin?: string
}

/** 반환된 ref를 붙인 요소가 화면에 보이면 onIntersect 호출 */
export const useIntersectionObserver = <T extends Element>({
  onIntersect,
  enabled = true,
  rootMargin = '0px',
}: Props) => {
  const targetRef = useRef<T>(null)

  useEffect(() => {
    const target = targetRef.current
    if (!enabled || !target) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onIntersect()
      },
      { rootMargin },
    )
    observer.observe(target)

    return () => observer.disconnect()
  }, [enabled, onIntersect, rootMargin])

  return targetRef
}
