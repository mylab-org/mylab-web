import { LabMemberItem } from '@/entities/lab'
import { Tag } from '@/shared/ui/tag'
import { Text } from '@/shared/ui/text'

export const LabMember = () => {
  return (
    <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[24px]'}>
      <h3 className={'text-[24px] leading-[32px] font-bold'}>연구원</h3>
      <LabMemberItem>김교수</LabMemberItem>
      <LabMemberItem>김교수</LabMemberItem>
      <LabMemberItem>김교수</LabMemberItem>
      <LabMemberItem>김교수</LabMemberItem>
      <LabMemberItem>김교수</LabMemberItem>
    </div>
  )
}
