import { P } from '@/shared/ui'

export const MainPage = () => {
  return (
    <div className={'flex h-full justify-center gap-[30px]'}>
      <section className={'flex w-[441px] flex-col gap-[30px]'}>
        <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[24px]'}>
          <h3 className={'font-pretendard text-[24px] font-bold text-blue-600'}>마이랩 연구실</h3>
          <div className={'flex flex-wrap gap-[6px]'}>
            <span className={'font-pretendard bg-gray100 rounded-full px-[10px] py-[4px] text-[14px] font-medium'}>
              무선 네트워크
            </span>
            <span className={'font-pretendard bg-gray100 rounded-full px-[10px] py-[4px] text-[14px] font-medium'}>
              모바일 엣지/클라우드 컴퓨팅
            </span>
            <span className={'font-pretendard bg-gray100 rounded-full px-[10px] py-[4px] text-[14px] font-medium'}>
              스마트 IoT
            </span>
            <span className={'font-pretendard bg-gray100 rounded-full px-[10px] py-[4px] text-[14px] font-medium'}>
              차세대 모바일 이동통신 (5G/6G)
            </span>
            <span className={'font-pretendard bg-gray100 rounded-full px-[10px] py-[4px] text-[14px] font-medium'}>
              지능형 미디어 통신
            </span>
          </div>
          <div className={'bg-gray100 w-full rounded-[8px] px-[10px] py-[8px]'}>
            <P className={'text-[14px] font-medium'}>본 연구실은 광대역 지능형 통신 네트워크를 연구합니다.</P>
          </div>
        </div>
        <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[24px]'}>
          <h3 className={'font-pretendard text-[24px] font-bold'}>링크</h3>
          <div className={'flex flex-wrap gap-[6px]'}>
            <span className={'font-pretendard rounded-full bg-gray-200 px-[10px] py-[6px] text-[14px] font-medium'}>
              + 추가하기
            </span>
            <span
              className={
                'font-pretendard border-gray300 rounded-full border bg-white px-[10px] py-[6px] text-[14px] font-normal'
              }
            >
              연구실 홈페이지
            </span>
            <span
              className={
                'font-pretendard border-gray300 rounded-full border bg-white px-[10px] py-[6px] text-[14px] font-normal'
              }
            >
              엑셀
            </span>
            <span
              className={
                'font-pretendard border-gray300 rounded-full border bg-white px-[10px] py-[6px] text-[14px] font-normal'
              }
            >
              이것저것
            </span>
            <span
              className={
                'font-pretendard border-gray300 rounded-full border bg-white px-[10px] py-[6px] text-[14px] font-normal'
              }
            >
              링크
            </span>
          </div>
        </div>
        <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[24px]'}>
          <h3 className={'font-pretendard text-[24px] font-bold'}>연구원</h3>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>김교수</P>
            <div className={'flex gap-[4px]'}>
              <span
                className={
                  'font-pretendard w-fit rounded-full bg-[#E1F4FF] px-[10px] py-[3px] text-[14px] font-medium text-[#1E75F8]'
                }
              >
                교수
              </span>
            </div>
          </div>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>이랩장</P>
            <div className={'flex gap-[4px]'}>
              <span
                className={
                  'font-pretendard w-fit rounded-full bg-[#FFF4E9] px-[10px] py-[3px] text-[14px] font-medium text-[#E35C67]'
                }
              >
                랩장
              </span>
              <span
                className={
                  'font-pretendard w-fit rounded-full bg-[#FBE9FF] px-[10px] py-[3px] text-[14px] font-medium text-[#8F42FC]'
                }
              >
                박사
              </span>
            </div>
          </div>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>이랩장</P>
            <div className={'flex gap-[4px]'}>
              <span
                className={
                  'font-pretendard w-fit rounded-full bg-[#FFF4E9] px-[10px] py-[3px] text-[14px] font-medium text-[#E35C67]'
                }
              >
                랩장
              </span>
              <span
                className={
                  'font-pretendard w-fit rounded-full bg-[#FBE9FF] px-[10px] py-[3px] text-[14px] font-medium text-[#8F42FC]'
                }
              >
                박사
              </span>
            </div>
          </div>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>이랩장</P>
            <div className={'flex gap-[4px]'}>
              <span
                className={
                  'font-pretendard w-fit rounded-full bg-[#FFF4E9] px-[10px] py-[3px] text-[14px] font-medium text-[#E35C67]'
                }
              >
                랩장
              </span>
              <span
                className={
                  'font-pretendard w-fit rounded-full bg-[#FBE9FF] px-[10px] py-[3px] text-[14px] font-medium text-[#8F42FC]'
                }
              >
                박사
              </span>
            </div>
          </div>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>이랩장</P>
            <div className={'flex gap-[4px]'}>
              <span
                className={
                  'font-pretendard w-fit rounded-full bg-[#FFF4E9] px-[10px] py-[3px] text-[14px] font-medium text-[#E35C67]'
                }
              >
                랩장
              </span>
              <span
                className={
                  'font-pretendard w-fit rounded-full bg-[#FBE9FF] px-[10px] py-[3px] text-[14px] font-medium text-[#8F42FC]'
                }
              >
                박사
              </span>
            </div>
          </div>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>이랩장</P>
            <div className={'flex gap-[4px]'}>
              <span
                className={
                  'font-pretendard w-fit rounded-full bg-[#FFF4E9] px-[10px] py-[3px] text-[14px] font-medium text-[#E35C67]'
                }
              >
                랩장
              </span>
              <span
                className={
                  'font-pretendard w-fit rounded-full bg-[#FBE9FF] px-[10px] py-[3px] text-[14px] font-medium text-[#8F42FC]'
                }
              >
                박사
              </span>
            </div>
          </div>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>이랩장</P>
            <div className={'flex gap-[4px]'}>
              <span
                className={
                  'font-pretendard w-fit rounded-full bg-[#FFF4E9] px-[10px] py-[3px] text-[14px] font-medium text-[#E35C67]'
                }
              >
                랩장
              </span>
              <span
                className={
                  'font-pretendard w-fit rounded-full bg-[#FBE9FF] px-[10px] py-[3px] text-[14px] font-medium text-[#8F42FC]'
                }
              >
                박사
              </span>
            </div>
          </div>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>이랩장</P>
            <div className={'flex gap-[4px]'}>
              <span
                className={
                  'font-pretendard w-fit rounded-full bg-[#FFF4E9] px-[10px] py-[3px] text-[14px] font-medium text-[#E35C67]'
                }
              >
                랩장
              </span>
              <span
                className={
                  'font-pretendard w-fit rounded-full bg-[#FBE9FF] px-[10px] py-[3px] text-[14px] font-medium text-[#8F42FC]'
                }
              >
                박사
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className={'flex flex-col gap-[30px]'}>2</section>
      <section className={'flex flex-col gap-[30px]'}>3</section>
    </div>
  )
}
