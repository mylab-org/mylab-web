import { LabMemberItem } from '@/entities/lab'

export const LabMember = () => {
  return (
    <div
      className={
        'flex flex-col gap-3.5 rounded-[24px] bg-white p-6 shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_4px_16px_rgba(0,0,0,0.04)]'
      }
    >
      <h3 className={'text-[24px] leading-8 font-bold'}>연구원</h3>
      <LabMemberItem>김교수</LabMemberItem>
      <LabMemberItem>김교수</LabMemberItem>
      <LabMemberItem>김교수</LabMemberItem>
      <LabMemberItem>김교수</LabMemberItem>
      <LabMemberItem>김교수</LabMemberItem>
    </div>
  )
}
