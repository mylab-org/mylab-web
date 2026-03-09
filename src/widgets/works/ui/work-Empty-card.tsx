import { Text } from '@/shared/ui'

export const WorkEmptyCard = () => {
  return (
    <div
      className={
        'bg-gray100 border-gray300 flex min-h-[165px] items-center justify-center rounded-[12px] border-2 border-dashed p-[20px]'
      }
    >
      <Text className={'text-gray400! text-[18px] font-semibold'}>아이템을 이곳에 드래그하여 옮길 수 있어요</Text>
    </div>
  )
}
