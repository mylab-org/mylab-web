import { Image } from 'next/dist/client/image-component'
import { cn } from '@/shared/lib'

interface AvatarProps {
  src?: string
  width?: number
  height?: number
  className?: string
  imgClassName?: string
  alt?: string
  children?: React.ReactNode
}

export const Avatar = ({ alt = '', children, height, src, imgClassName, className, width }: AvatarProps) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {src ? (
        <Image src={src} alt={alt} width={width} height={height} className={imgClassName} />
      ) : (
        <div className={imgClassName} />
      )}
      {children}
    </div>
  )
}
