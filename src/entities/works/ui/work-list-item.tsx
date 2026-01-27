import { P } from '@/shared/ui'

export const WorkListItem = () => {
  return (
    <div className={'flex flex-col gap-[5px]'}>
      <div className={'flex items-center gap-[5px]'}>
        <span className={'bg-tag1 h-[10px] w-[10px] rounded-full'} />
        <P className={'text-[20px] font-bold'}>2025 한국통신학회 동계종합학술발표회</P>
      </div>
      <div>
        <P className={'text-[16px] font-normal'}>2026.02.04(수)~2026.02.06(금)</P>
        <P className={'text-[16px] font-normal'}>모나 용평(용평리조트)</P>
      </div>
    </div>
  )
}
