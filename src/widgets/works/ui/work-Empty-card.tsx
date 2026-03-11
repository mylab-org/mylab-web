import { Text } from '@/shared/ui'

export const WorkEmptyCard = () => {
  return (
    <div
      className={
        'bg-gray100 border-gray300 flex items-center justify-center rounded-[12px] border-2 border-dashed p-[20px] md:min-h-[165px]'
      }
    >
      <Text className={'text-gray400! text-[14px] font-semibold md:text-[18px]'}>
        아이템을 이곳에 드래그하여 옮길 수 있어요
      </Text>
    </div>
  )
}
