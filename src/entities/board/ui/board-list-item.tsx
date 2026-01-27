import { P } from '@/shared/ui'

export const BoardListItem = () => {
  return (
    <li className={'gap-[5px] rounded-[12px] bg-white p-[20px]'}>
      <div className={'flex flex-col gap-[3px]'}>
        <P className={'text-[16px] font-medium'}>금주 미팅 안내드립니다.</P>
        <P className={'text-[14px] font-normal'}>이번주 미팅 없어염</P>
      </div>
      <div className={'flex items-center justify-between'}>
        <P className={'text-[14px] font-light text-[#6B6B6B]!'}>2025.12.04(수) 12:31</P>
        <P className={'text-[14px] font-normal text-[#6B6B6B]!'}>김교수</P>
      </div>
    </li>
  )
}
