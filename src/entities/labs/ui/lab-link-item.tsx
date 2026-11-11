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
    <a
      href={href}
      className={
        'border-border bg-card flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[12px] md:text-[14px]'
      }
      {...rest}
    >
      <div className={'flex items-center gap-2'}>
        <LinkIcon className={'h-4 w-4'} />
        {name}
      </div>
      {onDelete && (
        <button
          type={'button'}
          aria-label={`${name} 삭제`}
          disabled={isDeleting}
          className={'disabled:opacity-50'}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            onDelete()
          }}
        >
          <X className={'h-4 w-4 cursor-pointer'} />
        </button>
      )}
    </a>
  )
}
