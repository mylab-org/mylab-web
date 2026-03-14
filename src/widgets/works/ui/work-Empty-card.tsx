import { Text } from '@/shared/ui/text'

export const WorkEmptyCard = () => {
  return (
    <div
      className={
        'flex min-h-[130px] items-center justify-center rounded-[12px] border-2 border-dashed border-gray-300 bg-gray-100 p-[20px] md:min-h-[165px]'
      }
    >
      <Text className={'text-[14px] font-semibold text-gray-400! md:text-[18px]'}>
        아이템을 이곳에 드래그하여 옮길 수 있어요
      </Text>
    </div>
  )
}
