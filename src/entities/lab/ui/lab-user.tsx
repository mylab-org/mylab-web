import { P, Tag } from '@/shared/ui'

interface Props {
  children: React.ReactNode
}

export const LabUser = ({ children }: Props) => {
  return (
    <div className={'flex items-center justify-between'}>
      <P className={'text-[16px] font-medium'}>{children}</P>
      <div className={'flex gap-[4px]'}>
        <Tag.Roll variant={'professor'} />
      </div>
    </div>
  )
}
