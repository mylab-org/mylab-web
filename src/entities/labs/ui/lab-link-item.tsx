import { LinkIcon, X } from 'lucide-react'
import type { AnchorHTMLAttributes } from 'react'

interface LabLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  name: string
}

export const LabLinkItem = ({ href, name, ...rest }: LabLinkProps) => {
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
      <X className={'h-4 w-4'} />
    </a>
  )
}
