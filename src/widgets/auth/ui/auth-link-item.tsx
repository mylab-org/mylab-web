import { Text } from '@/shared/ui'
import { Button } from '@/shared/ui/button'

type Props = {
  title: string
  text: string
  href: string
}

export const AuthLinkItem = ({ text, title, href }: Props) => {
  return (
    <div>
      <Text className={'text-[12px]'}>{text}</Text>
      <Button.Link href={href} className={'text-[12px] text-blue-400 lg:text-[12px]'}>
        {title}
      </Button.Link>
    </div>
  )
}
