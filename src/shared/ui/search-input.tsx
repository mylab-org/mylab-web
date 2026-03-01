export const SearchInput = () => {
  return (
    <div className={'rounded-[12px] border border-gray-200 px-[20px] py-[10px]'}>
      <input
        className={
          'font-pretendard placeholder:text-gray400 w-full text-[14px] font-medium outline-none lg:text-[18px]'
        }
        placeholder={'제목으로 검색해보세요'}
      />
    </div>
  )
}
