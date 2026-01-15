'use client'

import { Image } from 'next/dist/client/image-component'
import { BoardListItem } from '@/entities/board'
import { LabDownloadData, LabLinkBtn } from '@/entities/lab-main'
import { P, Tag } from '@/shared/ui'

export const MainPage = () => {
  const getWeekDates = (baseDate: Date) => {
    const day = baseDate.getDay() // 0(일) ~ 6(토)
    const sunday = new Date(baseDate)
    sunday.setDate(baseDate.getDate() - day)

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(sunday)
      date.setDate(sunday.getDate() + i)
      return date
    })
  }

  const today = new Date('2029-01-01')
  const weekDates = getWeekDates(today)

  const isToday = (date: Date) => date.toDateString() === today.toDateString()

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
            <LabLinkBtn href={'#'} name={'연구실 홈페이지'} />
            <LabLinkBtn href={'#'} name={'엑셀'} />
            <LabLinkBtn href={'#'} name={'이것저것'} />
            <LabLinkBtn href={'#'} name={'링크'} />
          </div>
        </div>
        <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[24px]'}>
          <h3 className={'font-pretendard text-[24px] font-bold'}>연구원</h3>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>김교수</P>
            <div className={'flex gap-[4px]'}>
              <Tag variant={'professor'} />
            </div>
          </div>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>이랩장</P>
            <div className={'flex gap-[4px]'}>
              <Tag variant={'leader'} />
              <Tag variant={'doctoral'} />
            </div>
          </div>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>이랩장</P>
            <div className={'flex gap-[4px]'}>
              <Tag variant={'master'} />
            </div>
          </div>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>이랩장</P>
            <div className={'flex gap-[4px]'}>
              <Tag variant={'leader'} />
              <Tag variant={'student'} />
            </div>
          </div>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>이랩장</P>
            <div className={'flex gap-[4px]'}>
              <Tag variant={'student'} />
            </div>
          </div>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>이랩장</P>
            <div className={'flex gap-[4px]'}>
              <Tag variant={'student'} />
            </div>
          </div>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>이랩장</P>
            <div className={'flex gap-[4px]'}>
              <Tag variant={'student'} />
            </div>
          </div>
          <div className={'flex items-center justify-between'}>
            <P className={'text-[16px] font-medium'}>이랩장</P>
            <div className={'flex gap-[4px]'}>
              <Tag variant={'student'} />
            </div>
          </div>
        </div>
      </section>
      <section className={'flex w-[445px] flex-col gap-[30px]'}>
        <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[24px]'}>
          <h3 className={'font-pretendard text-[24px] font-bold'}>이번 주 일정</h3>
          <div>
            <div className={'grid grid-cols-7 text-center'}>
              {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                <P key={day} className="text-[14px] font-medium text-[#6B7280]!">
                  {day}
                </P>
              ))}
            </div>
            {/* 날짜 */}
            <div className="grid grid-cols-7 text-center">
              {weekDates.map(date => (
                <div key={date.toISOString()} className="flex justify-center">
                  <P
                    className={`flex h-[30px] w-[30px] items-center justify-center rounded-full text-[18px] font-medium ${
                      isToday(date) ? 'bg-dark text-white' : 'text-gray-900'
                    } `}
                  >
                    {date.getDate()}
                  </P>
                </div>
              ))}
            </div>
          </div>
          <div className={'flex flex-col gap-[5px] rounded-[12px] border border-[#E2E3E5] px-[12px] py-[16px]'}>
            <div className={'flex items-center gap-[5px]'}>
              <span className={'h-[10px] w-[10px] rounded-full bg-[#1E75F8]'} />
              <P className={'text-[14px] font-bold'}>2025 한국통신학회 동계종합학술발표회</P>
            </div>
            <div>
              <P className={'text-[14px] font-light'}>2026.02.04(수)~2026.02.06(금)</P>
              <P className={'text-[14px] font-light'}>모나 용평(용평리조트)</P>
            </div>
          </div>
          <div className={'flex flex-col gap-[5px] rounded-[12px] border border-[#E2E3E5] px-[12px] py-[16px]'}>
            <div className={'flex items-center gap-[5px]'}>
              <span className={'h-[10px] w-[10px] rounded-full bg-[#E35C67]'} />
              <P className={'text-[14px] font-bold'}>정기 미팅</P>
            </div>
            <div>
              <P className={'text-[14px] font-light'}>2025.12.11(목)</P>
              <P className={'text-[14px] font-light'}>8공 812호 세미나실</P>
            </div>
          </div>
        </div>
        <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[24px]'}>
          <h3 className={'font-pretendard text-[24px] font-bold'}>자료</h3>
          <div className={'flex flex-col gap-[10px]'}>
            <LabDownloadData />
            <LabDownloadData />
            <LabDownloadData />
          </div>
        </div>
      </section>
      <section className={'flex w-[550px] flex-col gap-[30px]'}>
        <div className={'flex flex-col gap-[10px] p-[24px]'}>
          <div className={'flex items-center justify-between'}>
            <h3 className={'font-pretendard text-[24px] font-bold'}>공지사항</h3>
            <Image src={'/icon/move.svg'} alt={''} width={24} height={24} className={'cursor-pointer'} />
          </div>
          <BoardListItem />
          <BoardListItem />
        </div>
        <div className={'flex flex-col gap-[10px] p-[24px]'}>
          <h3 className={'font-pretendard text-[24px] font-bold'}>업무 진척도</h3>
          <div className={'flex flex-col gap-[10px] rounded-[12px] bg-white p-[20px]'}>
            <div className={'flex flex-col gap-[5px]'}>
              <div className={'flex items-center gap-[5px]'}>
                <span className={'h-[10px] w-[10px] rounded-full bg-[#1E75F8]'} />
                <P className={'text-[20px] font-bold'}>2025 한국통신학회 동계종합학술발표회</P>
              </div>
              <div>
                <P className={'text-[16px] font-normal'}>2026.02.04(수)~2026.02.06(금)</P>
                <P className={'text-[16px] font-normal'}>모나 용평(용평리조트)</P>
              </div>
            </div>
            <div className={'flex flex-col gap-[5px]'}>
              <div className={'flex items-start gap-[10px]'}>
                <P className={'min-w-[80px] truncate text-[14px] font-bold'}>김랩장</P>
                <div className={'flex w-full flex-col gap-[6px] py-[4px]'}>
                  <div className={'bg-gray300 relative h-[10px] w-full rounded-[24px]'}>
                    <div className={'bg-blue500 absolute h-full w-2/3 rounded-[24px]'} />
                  </div>
                  <div className={'flex gap-[6px]'}>
                    <span
                      className={
                        'font-pretendard rounded-[20px] bg-blue-100 px-[8px] py-[4px] text-[12px] font-semibold text-blue-800'
                      }
                    >
                      교수 컨펌 대기
                    </span>
                    <span
                      className={'font-pretendard bg-gray100 text-gray400 rounded-[20px] px-[8px] py-[4px] text-[12px]'}
                    >
                      초안 작성
                    </span>
                    <span
                      className={'font-pretendard bg-gray100 text-gray400 rounded-[20px] px-[8px] py-[4px] text-[12px]'}
                    >
                      연구 진행
                    </span>
                    <span
                      className={'font-pretendard bg-gray100 text-gray400 rounded-[20px] px-[8px] py-[4px] text-[12px]'}
                    >
                      계획 수립
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
