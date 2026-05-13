'use client'

import { useRouter } from 'next/dist/client/components/navigation'
import { Image } from 'next/dist/client/image-component'

interface MobileAuthHeaderProps {
  onPrev?: () => void
  isPrev?: boolean
}

export const MobileAuthHeader = ({ onPrev, isPrev = false }: MobileAuthHeaderProps) => {
  const router = useRouter()
  const handlePrev = () => {
    return onPrev ? onPrev() : router.back()
  }
  return (
    <header className={'h-[60px] px-4 py-2.5'}>
      {isPrev && (
        <Image
          src={'/icon/move.svg'}
          alt={'prev'}
          width={24}
          height={24}
          className={'rotate-180 cursor-pointer'}
          onClick={handlePrev}
        />
      )}
    </header>
  )
}
