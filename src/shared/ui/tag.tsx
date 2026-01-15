import { TAG_STYLE } from '@/shared/constant/TAG_STYLE'

interface TagProps {
  variant: keyof typeof TAG_STYLE
}

export const Tag = ({ variant }: TagProps) => {
  const { bg, text, label } = TAG_STYLE[variant]
  return (
    <span className={`font-pretendard w-fit rounded-full ${bg} ${text} px-[10px] py-[3px] text-[14px] font-medium`}>
      {label}
    </span>
  )
}
