import type { WORK_TYPE } from '@/shared/constant/tag'

export const PROGRESS_COLOR: Record<keyof typeof WORK_TYPE, string> = {
  MEET: 'bg-gradient-to-r from-[#FFE4E6] to-[#FF2056]',
  PERSONAL: 'bg-gradient-to-r from-[#EDE9FE] to-[#8E51FF]',
  CONFERENCE: 'bg-gradient-to-r from-[#DBEAFE] to-[#2B7FFF]',
}
