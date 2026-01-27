import { ListItemTag, P } from '@/shared/ui'

export const CalendarListItem = () => {
  return (
    <div className={'flex flex-col gap-[5px] rounded-[12px] border border-[#E2E3E5] px-[12px] py-[16px]'}>
      <div className={'flex items-center gap-[5px]'}>
        <ListItemTag.Blue />
        <P className={'text-[14px] font-bold'}>2025 한국통신학회 동계종합학술발표회</P>
      </div>
      <div>
        <P className={'text-[14px] font-light'}>2026.02.04(수)~2026.02.06(금)</P>
        <P className={'text-[14px] font-light'}>모나 용평(용평리조트)</P>
      </div>
    </div>
  )
}
