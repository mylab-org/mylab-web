import { LinkText, P } from '@/shared/ui'

type Props = {
  title: string
  text: string
  href: string
}

export const AuthLinkItem = ({ text, title, href }: Props) => {
  return (
    <div>
      <P className={'text-[12px]'}>{text}</P>
      <LinkText href={href} className={'text-[12px]'}>
        {title}
      </LinkText>
    </div>
  )
}
