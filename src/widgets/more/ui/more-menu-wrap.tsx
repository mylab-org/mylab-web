interface MoreMenuWrapProps {
  title: string
  children: React.ReactNode
}

export const MoreMenuWrap = ({ title, children }: MoreMenuWrapProps) => {
  return (
    <div className={'flex flex-col gap-5 rounded-[12px] bg-white py-5 md:p-5'}>
      <h3 className={'text-[16px] font-bold md:text-[22px]'}>{title}</h3>
      {children}
    </div>
  )
}
