import { PROGRESS_COLOR } from '../config/const'
import type { WORK_TYPE } from '@/shared/constant/tag'
import { Tag } from '@/shared/ui/override/tag'

interface Props {
  type?: keyof typeof WORK_TYPE
  /** 현재 단계 (1부터 시작). totalSteps와 함께 넘기지 않으면 기본 더미 진행도로 표시 */
  statusStep?: number
  totalSteps?: number
}

export const WorksMyProgress = ({ type = 'PAPER', statusStep, totalSteps }: Props) => {
  const hasStep = statusStep !== undefined && totalSteps !== undefined
  const activeStep = statusStep ?? 3

  return (
    <div className={'flex items-start gap-2.5'}>
      <div className={'flex w-full flex-col gap-1.5 py-1'}>
        <div className={'relative h-2 w-full rounded-[24px] bg-gray-300'}>
          <div
            className={`${PROGRESS_COLOR[type]} absolute h-full ${hasStep ? '' : 'w-2/3'} rounded-[24px]`}
            style={hasStep ? { width: `${(statusStep / totalSteps) * 100}%` } : undefined}
          />
        </div>
        {type === 'PAPER' ? (
          <div className={'flex gap-1'}>
            <Tag.Work isActive={activeStep === 1}>연구 준비</Tag.Work>
            <Tag.Work isActive={activeStep === 2}>실험 진행</Tag.Work>
            <Tag.Work isActive={activeStep === 3}>초안 작성</Tag.Work>
            <Tag.Work isActive={activeStep === 4}>교수 검토</Tag.Work>
            <Tag.Work isActive={activeStep === 5}>완료</Tag.Work>
          </div>
        ) : (
          <div className={'flex gap-1'}>
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
