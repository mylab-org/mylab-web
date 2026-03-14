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
  type?: keyof typeof WORK_TYPE
}

interface WorkTypeProps {
  type: keyof typeof WORK_TYPE
}

interface LabTagProps {
  className?: string
  Icon?: React.ReactNode
  children: React.ReactNode
}

interface MemberTagProps {
  name: string
}

const WORK_TAG_COLOR: Record<keyof typeof WORK_TYPE, string> = {
  MEET: ' bg-red-100 text-red-800',
  PERSONAL: 'bg-violet-100 text-violet-800',
  CONFERENCE: 'bg-blue-100 text-blue-800',
}

const LabTag = ({ children, Icon, className }: LabTagProps) => {
  return (
    <span
      className={clsx(
        'font-pretendard rounded-full bg-gray-100 px-[12px] py-[4px] text-[12px] leading-[20px] font-medium md:text-[14px]',
        className,
      )}
    >
      # {children}
      {Icon && Icon}
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

const WorkTag = ({ isActive, children, type = 'CONFERENCE' }: WorkTagProps) => {
  return (
    <span
      className={clsx(
        'font-pretendard rounded-[20px] px-[8px] py-[4px] text-[10px] lg:text-[12px]',
        isActive ? `font-semibold ${WORK_TAG_COLOR[type]}` : 'bg-gray-100 text-gray-400',
      )}
    >
      {children}
    </span>
  )
}

const WorkTypeTag = ({ type }: WorkTypeProps) => {
  const { NAME, BG } = WORK_TYPE[type]
  return (
    <span
      className={clsx(
        'font-pretendard w-fit rounded-[20px] px-[8px] py-[4px] text-[10px] text-white lg:text-[12px]',
        BG,
      )}
    >
      {NAME}
    </span>
  )
}

const WorkMemberTag = ({ name }: MemberTagProps) => {
  return (
    <span
      className={
        'font-pretendard w-fit rounded-[20px] bg-blue-100 px-[8px] py-[4px] text-[10px] font-semibold text-blue-800 lg:text-[12px]'
      }
    >
      {name}
    </span>
  )
}

export const Tag = Object.assign(() => null, {
  Roll: RollTag,
  Lab: LabTag,
  Work: WorkTag,
  WorkType: WorkTypeTag,
  Etc: ETCTag,
  Member: WorkMemberTag,
})
