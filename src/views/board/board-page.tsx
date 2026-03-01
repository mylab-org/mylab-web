import { Image } from 'next/dist/client/image-component'
import { Text } from '@/shared/ui'

export const BoardPage = () => {
  return (
    <div className={'flex flex-1 gap-[10px] rounded-[12px] bg-white py-[10px] focus:outline-none'}>
      <section className={'flex w-[200px] flex-col gap-[10px] p-[10px]'}>
        <div className={'flex flex-col gap-[10px] border-b border-b-gray-200 pb-[15px]'}>
          <h3 className={'font-pretendard text-gray400! px-[6px] text-[14px] font-semibold'}>우리 연구실 메뉴</h3>
          <Text className={'flex h-[36px] items-center rounded-[8px] bg-[#F1F2F3] px-[12px] font-semibold'}>
            자유 게시판
          </Text>
          <Text className={'flex h-[36px] items-center rounded-[8px] px-[12px]'}>공지사항</Text>
          <Text className={'flex h-[36px] items-center rounded-[8px] px-[12px]'}>게시판 명</Text>
        </div>
        <div className={'flex flex-col gap-[10px] pt-[15px]'}>
          <h3 className={'font-pretendard text-gray400! px-[6px] text-[14px] font-semibold'}>공유 카테고리</h3>
          <Text className={'flex h-[36px] items-center rounded-[8px] px-[12px]'}>자유 게시판</Text>
          <Text className={'flex h-[36px] items-center rounded-[8px] px-[12px]'}>게시판 1</Text>
          <Text className={'flex h-[36px] items-center rounded-[8px] px-[12px]'}>게시판 2</Text>
        </div>
      </section>
      <section className={'flex flex-1 flex-col gap-[10px] p-[10px]'}>
        <div
          className={'bg-gray100 border-gray300 flex items-center gap-[10px] rounded-full border px-[20px] py-[10px]'}
        >
          <Text className={'w-full text-gray-500!'}>새 소식을 전해보세요!</Text>
          <Image src={'/icon/icon_board_write.svg'} alt={''} width={24} height={24} />
        </div>
        <div className={'flex flex-1 flex-col gap-[20px] py-[10px]'}>
          <div className={'flex flex-col gap-[4px] border-b border-gray-200 py-[10px]'}>
            <h4 className={'font-pretendard text-[18px] font-bold'}>비품 요청 드립니다!!!!!!</h4>
            <Text className={'text-gray400! text-[12px] font-medium'}>익명 님이 남긴 글 · ****** · 컴퓨터 통신</Text>
            <Text className={'text-[14px] font-normal whitespace-pre-wrap'}>
              {`참쌀 빨간색을 강력히 원합니다!@@!@!@\n커피캡슐도 종류가많앗으면 좋겟어염 저는 산미가 싫은데 하도 꼬소한거 다먹어서 이제 산미 있는거밖에없고 비카페인밖에없어여`}
            </Text>
            <div className={'flex items-center justify-between py-[10px]'}>
              <div className={'flex gap-[20px]'}>
                <div className={'flex cursor-pointer items-center gap-[10px]'}>
                  <Image src={'/icon/icon_board_notlike.svg'} alt={''} width={20} height={20} />
                  <Text className={'text-[16px] text-slate-400!'}>2</Text>
                </div>
                <div className={'flex cursor-pointer items-center gap-[10px]'}>
                  <Image src={'/icon/icon_board_comment.svg'} alt={''} width={20} height={20} />
                  <Text className={'text-[16px] text-slate-400!'}>2</Text>
                </div>
                <div className={'flex cursor-pointer items-center gap-[10px]'}>
                  <Image src={'/icon/icon_board_update.svg'} alt={''} width={20} height={20} />
                  <Text className={'text-[16px] text-slate-400!'}>2</Text>
                </div>
                <div className={'flex cursor-pointer items-center gap-[10px]'}>
                  <Image src={'/icon/icon_board_delete.svg'} alt={''} width={20} height={20} />
                  <Text className={'text-[16px] text-slate-400!'}>2</Text>
                </div>
              </div>
              <Text className={'text-gray400! text-[14px] font-medium'}>26.01.31 (토) 19:30</Text>
            </div>
            {/*  댓글 */}
            <div className={'flex flex-col gap-[5px]'}>
              <div className={'bg-gray100 flex gap-[10px] rounded-full px-[15px] py-[5px]'}>
                <input
                  type="text"
                  className={'font-pretendard w-full text-[12px] font-medium placeholder:text-[#9CA3AF]'}
                  placeholder={'댓글을 달아보세요.'}
                />
                <Image src={'/icon/icon_board_reply.svg'} alt={''} width={14} height={14} />
              </div>
              <div className={'flex flex-col gap-[4px] py-[5px]'}>
                <div className={'flex items-center gap-[5px]'}>
                  <Text className={'text-[14px] font-bold text-slate-600'}>김땡땡</Text>
                  <Text className={'text-[12px] font-medium text-slate-400'}>BIT Lab · 컴퓨터 통신</Text>
                </div>
                <div className={'flex flex-col gap-[10px]'}>
                  <Text className={'text-[14px] font-normal'}>ㅇㅈ 빨강도 맛잇음!</Text>
                  <div className={'flex items-center gap-[5px]'}>
                    <Image src={'/icon/icon_board_time.svg'} alt={''} width={12} height={12} />
                    <Text className={'text-[12px] font-medium text-slate-400'}>어제 19:00</Text>
                  </div>
                </div>
                {/*대댓글*/}
                <div className={'flex flex-col gap-[10px] rounded-[12px] bg-gray-50 px-[20px] py-[10px]'}>
                  <div className={'flex flex-col gap-[4px] py-[5px]'}>
                    <div className={'flex items-center gap-[5px]'}>
                      <Text className={'text-[14px] font-bold text-slate-600'}>김땡땡</Text>
                      <Text className={'text-[12px] font-medium text-slate-400'}>BIT Lab · 컴퓨터 통신</Text>
                    </div>
                    <div className={'flex flex-col gap-[10px]'}>
                      <Text className={'text-[14px] font-normal'}>ㅇㅈ 빨강도 맛잇음!</Text>
                      <div className={'flex items-center gap-[5px]'}>
                        <Image src={'/icon/icon_board_time.svg'} alt={''} width={12} height={12} />
                        <Text className={'text-[12px] font-medium text-slate-400'}>어제 19:00</Text>
                      </div>
                    </div>
                  </div>
                  <div className={'flex flex-col gap-[4px] py-[5px]'}>
                    <div className={'flex items-center gap-[5px]'}>
                      <Text className={'text-[14px] font-bold text-slate-600'}>김땡땡</Text>
                      <Text className={'text-[12px] font-medium text-slate-400'}>BIT Lab · 컴퓨터 통신</Text>
                    </div>
                    <div className={'flex flex-col gap-[10px]'}>
                      <Text className={'text-[14px] font-normal'}>ㅇㅈ 빨강도 맛잇음!</Text>
                      <div className={'flex items-center gap-[5px]'}>
                        <Image src={'/icon/icon_board_time.svg'} alt={''} width={12} height={12} />
                        <Text className={'text-[12px] font-medium text-slate-400'}>어제 19:00</Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={'flex flex-col gap-[4px] py-[5px]'}>
                <div className={'flex items-center gap-[5px]'}>
                  <Text className={'text-[14px] font-bold text-slate-600'}>김땡땡</Text>
                  <Text className={'text-[12px] font-medium text-slate-400'}>BIT Lab · 컴퓨터 통신</Text>
                </div>
                <div className={'flex flex-col gap-[10px]'}>
                  <Text className={'text-[14px] font-normal'}>ㅇㅈ 빨강도 맛잇음!</Text>
                  <div className={'flex items-center gap-[5px]'}>
                    <Image src={'/icon/icon_board_time.svg'} alt={''} width={12} height={12} />
                    <Text className={'text-[12px] font-medium text-slate-400'}>어제 19:00</Text>
                  </div>
                </div>
              </div>
              <div className={'flex flex-col gap-[4px] py-[5px]'}>
                <div className={'flex items-center gap-[5px]'}>
                  <Text className={'text-[14px] font-bold text-slate-600'}>김땡땡</Text>
                  <Text className={'text-[12px] font-medium text-slate-400'}>BIT Lab · 컴퓨터 통신</Text>
                </div>
                <div className={'flex flex-col gap-[10px]'}>
                  <Text className={'text-[14px] font-normal'}>ㅇㅈ 빨강도 맛잇음!</Text>
                  <div className={'flex items-center gap-[5px]'}>
                    <Image src={'/icon/icon_board_time.svg'} alt={''} width={12} height={12} />
                    <Text className={'text-[12px] font-medium text-slate-400'}>어제 19:00</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </section>
      <section className={'flex w-[400px] flex-col gap-[20px] p-[10px]'}>
        <h3 className={'font-pretendard text-[25px] font-bold'}>공지사항</h3>
        <div className={'flex flex-1 flex-col gap-[10px]'}>
          <div className={'flex flex-col gap-[5px] py-[10px]'}>
            <Text className={'text-[18px] font-bold'}>비품 확인해주세요</Text>
            <Text className={'text-gray400! text-[14px] font-medium'}>26.01.31 (토) 19:30 </Text>
          </div>
          <div className={'flex flex-col gap-[5px] py-[10px]'}>
            <Text className={'text-[18px] font-bold'}>비품 확인해주세요</Text>
            <Text className={'text-gray400! text-[14px] font-medium'}>26.01.31 (토) 19:30 </Text>
          </div>
          <div className={'flex flex-col gap-[5px] py-[10px]'}>
            <Text className={'text-[18px] font-bold'}>비품 확인해주세요</Text>
            <Text className={'text-gray400! text-[14px] font-medium'}>26.01.31 (토) 19:30 </Text>
          </div>
        </div>
      </section>
    </div>
  )
}
