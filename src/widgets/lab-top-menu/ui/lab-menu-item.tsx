import { Text } from '@/shared/ui'

type LabTopMenu = {
  name: string
  children: React.ReactNode
  isAdmin?: boolean
}

export const LabTopMenu = ({ children, name }: LabTopMenu) => {
  return (
    <div
      className={
        'flex w-[150px] cursor-pointer flex-col items-center justify-center gap-[5px] rounded-[24px] bg-white px-[20px] py-[10px]'
      }
    >
      <div className={'h-[30px] w-[30px]'}>{children}</div>
      <Text className={'text-[18px] font-bold'}>{name}</Text>
    </div>
  )
}
