'use client'

import { Image } from 'next/dist/client/image-component'
import { useState } from 'react'
import { BoardListItem } from '@/entities/board'
import { LabUser } from '@/entities/lab'
import { LabDownloadData, LabLinkBtn } from '@/entities/lab-main'
import type { LabType } from '@/shared/constant/nav'
import { Text, Tag } from '@/shared/ui'
import { MobileMainMenu } from '@/widgets/mobile-menu'

export const MobileMainPage = () => {
  const [labType, setLabType] = useState<LabType>('home')
  return (
    <>
      <MobileMainMenu type={labType} onMenuClick={(type: LabType) => setLabType(type)} />
      <div className={'flex flex-1 justify-center gap-[30px]'}>
        {labType === 'home' ? (
          <section className={'flex h-full w-full flex-col gap-[30px]'}>
            <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[24px]'}>
              <h3 className={'font-pretendard text-[24px] leading-[32px] font-bold text-blue-600'}>마이랩 연구실</h3>
              <div className={'flex flex-wrap gap-[6px]'}>
                <Tag.Lab>무선 네트워크</Tag.Lab>
                <Tag.Lab>모바일 엣지/클라우드 컴퓨팅</Tag.Lab>
                <Tag.Lab>스마트 IoT</Tag.Lab>
                <Tag.Lab>차세대 모바일 이동통신 (5G/6G)</Tag.Lab>
                <Tag.Lab>지능형 미디어 통신</Tag.Lab>
              </div>
              <div className={'bg-gray100 w-full rounded-[8px] px-[10px] py-[8px]'}>
                <Text className={'text-[14px] font-medium'}>본 연구실은 광대역 지능형 통신 네트워크를 연구합니다.</Text>
              </div>
            </div>
            <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[24px]'}>
              <h3 className={'font-pretendard text-[24px] leading-[32px] font-bold'}>링크</h3>
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
              <h3 className={'font-pretendard text-[24px] leading-[32px] font-bold'}>자료</h3>
              <div className={'flex flex-col gap-[10px]'}>
                <LabDownloadData />
                <LabDownloadData />
                <LabDownloadData />
              </div>
            </div>
          </section>
        ) : labType === 'member' ? (
          <section className={'flex h-full w-full flex-col gap-[30px]'}>
            <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[24px]'}>
              <h3 className={'font-pretendard text-[24px] leading-[32px] font-bold'}>연구원</h3>
              <LabUser>김교수</LabUser>
              <div className={'flex items-center justify-between'}>
                <Text className={'text-[16px] font-medium'}>이랩장</Text>
                <div className={'flex gap-[4px]'}>
                  <Tag.Roll variant={'leader'} />
                  <Tag.Roll variant={'doctoral'} />
                </div>
              </div>
              <div className={'flex items-center justify-between'}>
                <Text className={'text-[16px] font-medium'}>이랩장</Text>
                <div className={'flex gap-[4px]'}>
                  <Tag.Roll variant={'master'} />
                </div>
              </div>
              <div className={'flex items-center justify-between'}>
                <Text className={'text-[16px] font-medium'}>이랩장</Text>
                <div className={'flex gap-[4px]'}>
                  <Tag.Roll variant={'leader'} />
                  <Tag.Roll variant={'student'} />
                </div>
              </div>
              <div className={'flex items-center justify-between'}>
                <Text className={'text-[16px] font-medium'}>이랩장</Text>
                <div className={'flex gap-[4px]'}>
                  <Tag.Roll variant={'student'} />
                </div>
              </div>
              <div className={'flex items-center justify-between'}>
                <Text className={'text-[16px] font-medium'}>이랩장</Text>
                <div className={'flex gap-[4px]'}>
                  <Tag.Roll variant={'student'} />
                </div>
              </div>
              <div className={'flex items-center justify-between'}>
                <Text className={'text-[16px] font-medium'}>이랩장</Text>
                <div className={'flex gap-[4px]'}>
                  <Tag.Roll variant={'student'} />
                </div>
              </div>
              <div className={'flex items-center justify-between'}>
                <Text className={'text-[16px] font-medium'}>이랩장</Text>
                <div className={'flex gap-[4px]'}>
                  <Tag.Roll variant={'student'} />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className={'flex h-full w-full flex-col gap-[30px]'}>
            <div className={'flex flex-col gap-[10px]'}>
              <div className={'flex items-center justify-between'}>
                <h3 className={'font-pretendard text-[24px] leading-[32px] font-bold'}>공지사항</h3>
                <Image src={'/icon/move.svg'} alt={''} width={24} height={24} className={'cursor-pointer'} />
              </div>
              <ul className={'flex flex-col gap-[10px]'}>
                <BoardListItem />
                <BoardListItem />
              </ul>
            </div>
          </section>
        )}

        {/*<section className={'flex w-[445px] flex-col gap-[30px]'}>*/}
        {/*  <div className={'flex flex-col gap-[14px] rounded-[24px] bg-white p-[24px]'}>*/}
        {/*    <h3 className={'font-pretendard text-[24px] font-bold leading-[32px]'}>이번 주 일정</h3>*/}
        {/*    <CalendarWeek />*/}
        {/*    <CalendarListItem />*/}
        {/*    <div className={'flex flex-col gap-[5px] rounded-[12px] border border-[#E2E3E5] px-[12px] py-[16px]'}>*/}
        {/*      <div className={'flex items-center gap-[5px]'}>*/}
        {/*        <ListItemTag.Red />*/}
        {/*        <Text className={'text-[14px] font-bold'}>정기 미팅</Text>*/}
        {/*      </div>*/}
        {/*      <div>*/}
        {/*        <Text className={'text-[14px] font-light'}>2025.12.11(목)</Text>*/}
        {/*        <Text className={'text-[14px] font-light'}>8공 812호 세미나실</Text>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}
        {/*<section className={'flex w-[550px] flex-col gap-[30px]'}>*/}
        {/*  <div className={'flex flex-col gap-[10px]'}>*/}
        {/*    <div className={'flex items-center justify-between'}>*/}
        {/*      <h3 className={'font-pretendard text-[24px] font-bold leading-[32px]'}>공지사항</h3>*/}
        {/*      <Image src={'/icon/move.svg'} alt={''} width={24} height={24} className={'cursor-pointer'} />*/}
        {/*    </div>*/}
        {/*    <ul className={'flex flex-col gap-[10px]'}>*/}
        {/*      <BoardListItem />*/}
        {/*      <BoardListItem />*/}
        {/*    </ul>*/}
        {/*  </div>*/}
        {/*  /!* 업무 진척도 *!/*/}
        {/*  <div className={'flex flex-col gap-[10px]'}>*/}
        {/*    <h3 className={'font-pretendard text-[24px] font-bold leading-[32px]'}>업무 진척도</h3>*/}
        {/*    <div className={'flex flex-col gap-[10px] rounded-[12px] bg-white p-[20px]'}>*/}
        {/*      <div className={'flex flex-col gap-[5px]'}>*/}
        {/*        <WorkListItem />*/}
        {/*      </div>*/}
        {/*      <div className={'flex flex-col gap-[5px]'}>*/}
        {/*        <WorkProgress />*/}
        {/*        <WorkProgress />*/}
        {/*        <WorkProgress />*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</section>*/}
      </div>
    </>
  )
}
