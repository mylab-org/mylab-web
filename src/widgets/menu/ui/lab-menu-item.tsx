import { Text } from '@/shared/ui/text'

type LabTopMenu = {
  name: string
  children: React.ReactNode
  onClick: () => void
}

export const LabTopMenu = ({ children, name, onClick }: LabTopMenu) => {
  return (
    <div
      className={
        'flex w-[150px] flex-1 cursor-pointer flex-col items-center justify-center gap-1.25 rounded-[8px] bg-white p-1.25 md:rounded-[24px] md:px-5 md:py-2.5'
      }
      onClick={onClick}
    >
      <div className={'h-4 w-4 md:h-7.5 md:w-7.5'}>{children}</div>
      <Text className={'text-[10px] font-bold md:text-[18px]'}>{name}</Text>
    </div>
  )
}
