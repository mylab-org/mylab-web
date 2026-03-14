import type { WORK_TYPE } from '@/shared/constant/tag'
import { Tag } from '@/shared/ui/tag'

interface WorkProgressProps {
  type?: keyof typeof WORK_TYPE
}

const PROGRESS_COLOR: Record<keyof typeof WORK_TYPE, string> = {
  MEET: 'bg-gradient-to-r from-[#FFE4E6] to-[#FF2056]',
  PERSONAL: 'bg-gradient-to-r from-[#EDE9FE] to-[#8E51FF]',
  CONFERENCE: 'bg-gradient-to-r from-[#DBEAFE] to-[#2B7FFF]',
}

export const WorkMyProgress = ({ type = 'CONFERENCE' }: WorkProgressProps) => {
  return (
    <div className={'flex items-start gap-[10px]'}>
      <div className={'flex w-full flex-col gap-[6px] py-[4px]'}>
        <div className={'relative h-[8px] w-full rounded-[24px] bg-gray-300'}>
          <div className={`${PROGRESS_COLOR[type]} absolute h-full w-2/3 rounded-[24px]`} />
        </div>
        {type === 'CONFERENCE' ? (
          <div className={'flex gap-[4px]'}>
            <Tag.Work isActive={false}>연구 준비</Tag.Work>
            <Tag.Work isActive={false}>실험 진행</Tag.Work>
            <Tag.Work isActive={true}>초안 작성</Tag.Work>
            <Tag.Work isActive={false}>교수 검토</Tag.Work>
            <Tag.Work isActive={false}>완료</Tag.Work>
          </div>
        ) : (
          <div className={'flex gap-[4px]'}>
            <Tag.Work type={type} isActive={false}>
              업무 시작 전
            </Tag.Work>
            <Tag.Work type={type} isActive={false}>
              업무 진행 중
            </Tag.Work>
            <Tag.Work type={type} isActive={true}>
              업무 완료
            </Tag.Work>
          </div>
        )}
      </div>
    </div>
  )
}
