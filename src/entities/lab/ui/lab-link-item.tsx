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
        'font-pretendard border-gray300 flex items-center gap-[6px] rounded-full border bg-white px-[10px] py-[6px] text-[12px] md:text-[14px]'
      }
      {...rest}
    >
      <div className={'flex items-center gap-[2px]'}>
        <Image src={'/icon/link.svg'} alt={''} width={16} height={16} />
        {name}
      </div>
      <Image src={'/icon/x.svg'} alt={''} width={16} height={16} />
    </a>
  )
}
