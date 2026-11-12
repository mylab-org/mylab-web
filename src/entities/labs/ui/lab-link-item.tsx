import { LinkIcon, X } from 'lucide-react'
import type { AnchorHTMLAttributes } from 'react'

interface LabLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  name: string
  onDelete?: () => void
  isDeleting?: boolean
}

export const LabLinkItem = ({ href, name, onDelete, isDeleting = false, ...rest }: LabLinkProps) => {
  return (
    <div
      className={
        'border-border bg-card flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[12px] md:text-[14px]'
      }
    >
      <a href={href} target={'_blank'} rel={'noreferrer'} className={'flex items-center gap-2'} {...rest}>
        <LinkIcon className={'h-4 w-4'} />
        {name}
      </a>
      {onDelete && (
        <button
          type={'button'}
          aria-label={`${name} 링크 삭제`}
          disabled={isDeleting}
          className={'text-subtle-foreground hover:text-error cursor-pointer disabled:opacity-50'}
          onClick={onDelete}
        >
          <X className={'h-4 w-4'} />
        </button>
      )}
    </div>
  )
}
