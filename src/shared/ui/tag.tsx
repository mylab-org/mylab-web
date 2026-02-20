import clsx from 'clsx'
import { ROLL_TAG, WORK_TYPE } from '@/shared/constant/tag'

interface RollTagProps {
  variant: keyof typeof ROLL_TAG
}

interface WorkTagProps {
  children: React.ReactNode
  isActive: boolean
}

interface WorkTypeProps {
  type: keyof typeof WORK_TYPE
}

const LabTag = ({ children }: { children: React.ReactNode }) => {
  return (
    <span
      className={'font-pretendard bg-gray100 rounded-full px-[10px] py-[4px] text-[14px] leading-[20px] font-medium'}
    >
      # {children}
    </span>
  )
}

const RollTag = ({ variant }: RollTagProps) => {
  const { bg, text, label } = ROLL_TAG[variant]
  return (
    <span
      className={`font-pretendard w-fit rounded-full ${bg} ${text} px-[10px] py-[3px] text-[14px] leading-[22px] font-medium`}
    >
      {label}
    </span>
  )
}

const WorkTag = ({ isActive, children }: WorkTagProps) => {
  return (
    <span
      className={clsx(
        'font-pretendard rounded-[20px] px-[8px] py-[4px] text-[12px]',
        isActive ? 'bg-blue-100 font-semibold text-blue-800' : 'bg-gray100 text-gray400',
      )}
    >
      {children}
    </span>
  )
}

const WorkTypeTag = ({ type }: WorkTypeProps) => {
  const { NAME, BG } = WORK_TYPE[type]
  return (
    <span className={clsx('font-pretendard w-fit rounded-[20px] px-[8px] py-[4px] text-[12px] text-white', BG)}>
      {NAME}
    </span>
  )
}

export const Tag = Object.assign(() => null, {
  Roll: RollTag,
  Lab: LabTag,
  Work: WorkTag,
  WorkType: WorkTypeTag,
})
