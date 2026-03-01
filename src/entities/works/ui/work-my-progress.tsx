import { Tag } from '@/shared/ui'

export const WorkMyProgress = () => {
  return (
    <div className={'flex items-start gap-[10px]'}>
      <div className={'flex w-full flex-col gap-[6px] py-[4px]'}>
        <div className={'bg-gray300 relative h-[8px] w-full rounded-[24px]'}>
          <div className={'bg-blue500 absolute h-full w-2/3 rounded-[24px]'} />
        </div>
        <div className={'flex gap-[4px]'}>
          <Tag.Work isActive={false}>연구 준비</Tag.Work>
          <Tag.Work isActive={false}>실험 진행</Tag.Work>
          <Tag.Work isActive={true}>초안 작성</Tag.Work>
          <Tag.Work isActive={false}>교수 검토</Tag.Work>
          <Tag.Work isActive={false}>완료</Tag.Work>
        </div>
      </div>
    </div>
  )
}
