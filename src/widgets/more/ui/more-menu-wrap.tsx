interface MoreMenuWrapProps {
  title: string
  children: React.ReactNode
}

export const MoreMenuWrap = ({ title, children }: MoreMenuWrapProps) => {
  return (
    <div className={'flex flex-col gap-[20px] rounded-[12px] bg-white py-[20px] md:p-[20px]'}>
      <h3 className={'font-pretendard text-[16px] font-bold md:text-[22px]'}>{title}</h3>
      {children}
    </div>
  )
}
