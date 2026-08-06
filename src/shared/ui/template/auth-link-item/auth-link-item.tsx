import { Button } from '@/shared/ui/override/button'
import { Text } from '@/shared/ui/override/text'

type Props = {
  title: string
  text: string
  href: string
}

export const AuthLinkItem = ({ text, title, href }: Props) => {
  return (
    <div>
      <Text className={'text-[12px]'}>{text}</Text>
      <Button.Link href={href} target={'_self'} className={'text-[12px] text-blue-400 lg:text-[12px]'}>
        {title}
      </Button.Link>
    </div>
  )
}
