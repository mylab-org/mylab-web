import { Text } from '@/shared/ui'

type LabTopMenu = {
  name: string
  children: React.ReactNode
  onClick: () => void
}

export const LabTopMenu = ({ children, name, onClick }: LabTopMenu) => {
  return (
    <div
      className={
        'flex w-[150px] flex-1 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-[8px] bg-white p-[5px] md:rounded-[24px] md:px-[20px] md:py-[10px]'
      }
      onClick={onClick}
    >
      <div className={'h-[16px] w-[16px] md:h-[30px] md:w-[30px]'}>{children}</div>
      <Text className={'text-[10px] font-bold md:text-[18px]'}>{name}</Text>
    </div>
  )
}
