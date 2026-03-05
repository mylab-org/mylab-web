interface MoreMenuWrapProps {
  title: string
  children: React.ReactNode
}

export const MoreMenuWrap = ({ title, children }: MoreMenuWrapProps) => {
  return (
    <div className={'flex flex-col gap-[20px] rounded-[12px] bg-white p-[20px]'}>
      <h3 className={'font-pretendard text-[22px] font-bold'}>{title}</h3>
      {children}
    </div>
  )
}
