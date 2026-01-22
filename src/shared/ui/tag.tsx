import clsx from 'clsx'
import { TAG_STYLE } from '@/shared/constant/TAG_STYLE'

interface RollTagProps {
  variant: keyof typeof TAG_STYLE
}

interface WorkTagProps {
  children: React.ReactNode
  isActive: boolean
}

const LabTag = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className={'font-pretendard bg-gray100 rounded-full px-[10px] py-[4px] text-[14px] font-medium'}>
      {children}
    </span>
  )
}

const RollTag = ({ variant }: RollTagProps) => {
  const { bg, text, label } = TAG_STYLE[variant]
  return (
    <span className={`font-pretendard w-fit rounded-full ${bg} ${text} px-[10px] py-[3px] text-[14px] font-medium`}>
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

export const Tag = Object.assign(() => null, {
  Roll: RollTag,
  Lab: LabTag,
  Work: WorkTag,
})
