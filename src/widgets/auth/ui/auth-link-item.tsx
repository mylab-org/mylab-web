import { LinkText, Text } from '@/shared/ui'

type Props = {
  title: string
  text: string
  href: string
}

export const AuthLinkItem = ({ text, title, href }: Props) => {
  return (
    <div>
      <Text className={'text-[12px]'}>{text}</Text>
      <LinkText href={href} className={'text-[12px]'}>
        {title}
      </LinkText>
    </div>
  )
}
