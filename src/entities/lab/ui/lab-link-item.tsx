import { Image } from 'next/dist/client/image-component'
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
        'flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-2.5 py-1.5 text-[12px] md:text-[14px]'
      }
      {...rest}
    >
      <div className={'flex items-center gap-0.5'}>
        <Image src={'/icon/link.svg'} alt={''} width={16} height={16} />
        {name}
      </div>
      <Image src={'/icon/x.svg'} alt={''} width={16} height={16} />
    </a>
  )
}
