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
      <Text className={'text-muted-foreground text-[12px]'}>{text}</Text>
      <Button.Link href={href} target={'_self'} className={'text-brand text-[12px] lg:text-[12px]'}>
        {title}
      </Button.Link>
    </div>
  )
}
