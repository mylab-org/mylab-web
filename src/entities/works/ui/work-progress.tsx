import { Text } from '@/shared/ui'
import { Tag } from '@/shared/ui/tag'

export const WorkProgress = () => {
  return (
    <div className={'flex items-start gap-[10px]'}>
      <Text className={'min-w-[80px] truncate text-[14px] font-bold'}>김랩장</Text>
      <div className={'flex w-full flex-col gap-[6px] py-[4px]'}>
        <div className={'relative h-[10px] w-full rounded-[24px] bg-gray-300'}>
          <div className={'absolute h-full w-2/3 rounded-[24px] bg-blue-500'} />
        </div>
        <div className={'flex gap-[6px]'}>
          <Tag.Work isActive={true}>교수 컨펌 대기</Tag.Work>
          <Tag.Work isActive={false}>초안 작성</Tag.Work>
          <Tag.Work isActive={false}>연구 진행</Tag.Work>
          <Tag.Work isActive={false}>계획 수립</Tag.Work>
        </div>
      </div>
    </div>
  )
}
