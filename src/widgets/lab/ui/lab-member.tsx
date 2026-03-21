import { LabMemberItem } from '@/entities/lab'

export const LabMember = () => {
  return (
    <div className={'flex flex-col gap-3.5 rounded-[24px] bg-white p-6'}>
      <h3 className={'text-[24px] leading-8 font-bold'}>연구원</h3>
      <LabMemberItem>김교수</LabMemberItem>
      <LabMemberItem>김교수</LabMemberItem>
      <LabMemberItem>김교수</LabMemberItem>
      <LabMemberItem>김교수</LabMemberItem>
      <LabMemberItem>김교수</LabMemberItem>
    </div>
  )
}
