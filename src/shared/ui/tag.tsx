import clsx from 'clsx'
import { ETC_TYPE, ROLL_TAG, WORK_TYPE } from '@/shared/constant/tag'

interface RollTagProps {
  variant: keyof typeof ROLL_TAG
}

interface ETCTagProps {
  variant: keyof typeof ETC_TYPE
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
      className={
        'font-pretendard bg-gray100 rounded-full px-[12px] py-[4px] text-[12px] leading-[20px] font-medium md:text-[14px]'
      }
    >
      # {children}
    </span>
  )
}

const RollTag = ({ variant }: RollTagProps) => {
  const { bg, text, label } = ROLL_TAG[variant]
  return (
    <span
      className={`font-pretendard w-fit rounded-full ${bg} ${text} px-[10px] py-[3px] text-[12px] leading-[22px] font-medium md:text-[14px]`}
    >
      {label}
    </span>
  )
}

const ETCTag = ({ variant }: ETCTagProps) => {
  const { BG, NAME, TC } = ETC_TYPE[variant]
  return (
    <span
      className={`font-pretendard w-fit rounded-[15px] ${BG} ${TC} px-[8px] py-[2px] text-[12px] font-semibold lg:text-[14px]`}
    >
      {NAME}
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
  Etc: ETCTag,
})
