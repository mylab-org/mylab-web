import { Text } from '@/shared/ui/override/text'

type Props = {
  children: React.ReactNode
}

export const LabNotDataUI = ({ children }: Props) => {
  return (
    <div
      className={
        'border-border bg-muted/50 flex items-center justify-center rounded-[12px] border border-dashed px-4 py-3'
      }
    >
      <Text className={'text-muted-foreground! text-[12px] font-medium md:text-[14px]'}>{children}</Text>
    </div>
  )
}
