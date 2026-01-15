import type { AnchorHTMLAttributes } from 'react'

interface LabLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  name: string
}

export const LabLinkBtn = ({ href, name, ...rest }: LabLinkProps) => {
  return (
    <a
      href={href}
      className={
        'font-pretendard border-gray300 rounded-full border bg-white px-[10px] py-[6px] text-[14px] font-normal'
      }
      {...rest}
    >
      {name}
    </a>
  )
}
