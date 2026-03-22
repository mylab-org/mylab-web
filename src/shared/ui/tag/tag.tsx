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
      className={clsx('rounded-full bg-gray-100 px-3 py-1 text-[12px] leading-5 font-medium md:text-[14px]', className)}
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
      className={`w-fit rounded-full ${bg} ${text} px-2.5 py-0.75 text-[12px] leading-5.5 font-medium md:text-[14px]`}
    >
      {label}
    </span>
  )
}

const ETCTag = ({ variant }: ETCTagProps) => {
  const { BG, NAME, TC } = ETC_TYPE[variant]
  return (
    <span className={`w-fit rounded-[15px] ${BG} ${TC} px-2 py-0.5 text-[12px] font-semibold lg:text-[14px]`}>
      {NAME}
    </span>
  )
}

const WorkTag = ({ isActive, children, type = 'CONFERENCE' }: WorkTagProps) => {
  return (
    <span
      className={clsx(
        'rounded-[20px] px-2 py-1 text-[10px] lg:text-[12px]',
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
    <span className={clsx('w-fit rounded-[20px] px-2 py-1 text-[10px] text-white lg:text-[12px]', BG)}>{NAME}</span>
  )
}

const WorkMemberTag = ({ name }: MemberTagProps) => {
  return (
    <span
      className={'w-fit rounded-[20px] bg-blue-100 px-2 py-1 text-[10px] font-semibold text-blue-800 lg:text-[12px]'}
    >
      {name}
    </span>
  )
}

const TagBlue = () => {
  return <span className={'bg-tag1 h-2.5 w-2.5 rounded-full'} />
}

const TagRed = () => {
  return <span className={'bg-tag2 h-2.5 w-2.5 rounded-full'} />
}

export const Tag = Object.assign(() => null, {
  Roll: RollTag,
  Lab: LabTag,
  Work: WorkTag,
  WorkType: WorkTypeTag,
  Etc: ETCTag,
  Member: WorkMemberTag,
  Blue: TagBlue,
  Red: TagRed,
})
