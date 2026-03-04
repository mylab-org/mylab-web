'use client'

import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { Button, Tag, Text, ToggleSwitch } from '@/shared/ui'
import { MoreLabUpdate, MoreServiceUse, MoreUserPw, MoreUserUpdate } from '@/widgets/more-side-content'

export const MorePage = () => {
  const openSideModal = useSideModalStore(state => state.openSideModal)

  return (
    <div className={'flex flex-1 gap-[30px] focus:outline-none'}>
      <section className={'flex flex-1 shrink-0 flex-col gap-[10px]'}>
        <div className={'flex flex-col gap-[10px] rounded-[12px] bg-white p-[20px]'}>
          <div className={'flex gap-[20px] py-[20px]'}>
            <div className={'bg-gray300 h-[100px] w-[100px] rounded-full'}></div>
            <div className={'flex flex-col gap-[5px] p-[10px]'}>
              <div className={'flex gap-[10px]'}>
                <Text className={'text-[16px] font-bold whitespace-pre-wrap md:text-[20px]'}>홍길동님</Text>
                <div className={'flex gap-[5px]'}>
                  <Tag.Roll variant={'leader'} />
                  <Tag.Roll variant={'doctoral'} />
                </div>
              </div>
              <div className={'text-[10px] font-medium md:text-[14px]'}>
                <Text className={'text-gray-600!'}>BIT Lab · 컴퓨터 통신</Text>
                <Text className={'text-gray-600!'}>wlsdud6221@naver.com</Text>
              </div>
            </div>
          </div>
          <Button onClick={() => openSideModal(MoreUserUpdate, '내 정보 수정')}>내 정보 수정</Button>
        </div>
        <div className={'flex flex-col gap-[20px] rounded-[12px] bg-white p-[20px]'}>
          <h3 className={'font-pretendard text-[22px] font-bold'}>나의 활동</h3>
          <div className={'flex flex-col gap-[20px]'}>
            <Text className={'text-[16px] font-medium'}>내 비품 대여 내역</Text>
            <Text className={'text-[16px] font-medium'}>내 비품 신청 내역</Text>
            <Text className={'text-[16px] font-medium'}>내가 작성한 글 확인</Text>
            <Text className={'text-[16px] font-medium'}>내가 작성한 댓글 확인</Text>
            <Text className={'text-gray400! text-[16px] font-medium'}>연구실 나가기</Text>
          </div>
        </div>
      </section>
      <section className={'flex flex-1 shrink-0 flex-col gap-[10px]'}>
        <div className={'flex flex-col gap-[20px] rounded-[12px] bg-white p-[24px]'}>
          <div className={'flex flex-col gap-[14px]'}>
            <h3 className={'font-pretendard text-[18px] leading-[32px] font-bold text-blue-600 md:text-[24px]'}>
              마이랩 연구실
            </h3>
            <div className={'flex flex-wrap gap-[6px]'}>
              <Tag.Lab>무선 네트워크</Tag.Lab>
              <Tag.Lab>모바일 엣지/클라우드 컴퓨팅</Tag.Lab>
              <Tag.Lab>스마트 IoT</Tag.Lab>
              <Tag.Lab>차세대 모바일 이동통신 (5G/6G)</Tag.Lab>
              <Tag.Lab>지능형 미디어 통신</Tag.Lab>
            </div>
            <div className={'bg-gray100 w-full rounded-[8px] px-[10px] py-[8px]'}>
              <Text className={'text-[12px] font-medium md:text-[14px]'}>
                본 연구실은 광대역 지능형 통신 네트워크를 연구합니다.
              </Text>
            </div>
            <Button className={'text-[16px]'} onClick={() => openSideModal(MoreLabUpdate, '연구실 정보 수정')}>
              수정하기
            </Button>
          </div>
          <div className={'flex flex-col gap-[20px]'}>
            <div className={'flex flex-col gap-[10px]'}>
              <h3 className={'font-pretendard text-[16px] font-bold md:text-[20px]'}>연구실 삭제</h3>
              <Text className={'text-[12px] font-medium whitespace-pre-wrap text-gray-600! md:text-[14px]'}>
                {`연구실 삭제 전, 데이터 백업이 이루어졌는지 확인해주세요.\n삭제 이후에는 데이터를 복구할 방법이 없으며, 본 서비스는 일괄 책임지지 않습니다.`}
              </Text>
            </div>
            <Button className={'text-[16px]'}>연구실 삭제</Button>
          </div>
        </div>
        <div className={'flex flex-col gap-[20px] rounded-[12px] bg-white p-[20px]'}>
          <h3 className={'font-pretendard text-[18px] font-bold md:text-[22px]'}>연구원 관리</h3>
          <Text className={'text-[12px] font-medium whitespace-pre-wrap text-gray-600! md:text-[14px]'}>
            {`연구실에 가입된 인원들을 관리할 수 있어요.\n랩장 권한 설정, 학적 변경이 가능합니다.`}
          </Text>
          <Button className={'bg-gray100! text-gray900! flex items-center justify-center gap-[4px] text-[16px]'}>
            <div className={'flex items-center gap-[4px]'}>
              <div className={'flex items-center'}>
                <div className={'bg-gray300 h-[25px] w-[25px] rounded-full border'} />
                <div className={'bg-gray300 -ml-3 h-[25px] w-[25px] rounded-full border'} />
                <div className={'bg-gray300 -ml-3 h-[25px] w-[25px] rounded-full border'} />
              </div>
              <span className={'font-pretendard text-[12px] font-bold'}>+1</span>
            </div>
            연구원 전체 보기
          </Button>
        </div>
      </section>
      <section className={'flex flex-1 shrink-0 flex-col gap-[10px]'}>
        <div className={'flex flex-col gap-[20px] rounded-[12px] bg-white p-[20px]'}>
          <h3 className={'font-pretendard text-[22px] font-bold'}>서비스 설정</h3>
          <div className={'flex flex-col gap-[20px]'}>
            <div>
              <h5 className={'font-pretendard text-[16px] font-bold'}>테마 설정</h5>
              <div className={'flex items-center justify-between p-[10px]'}>
                <Text
                  className={
                    'min-w-[80px] rounded-[10px] bg-gray-200 px-[10px] py-[5px] text-center text-[16px] font-semibold'
                  }
                >
                  시스템 설정
                </Text>
                <Text
                  className={
                    'text-gray400! min-w-[80px] rounded-[10px] px-[10px] py-[5px] text-center text-[16px] font-semibold'
                  }
                >
                  라이트
                </Text>
                <Text
                  className={
                    'text-gray400! min-w-[80px] rounded-[10px] px-[10px] py-[5px] text-center text-[16px] font-semibold'
                  }
                >
                  다크
                </Text>
              </div>
            </div>
            <div className={'flex flex-col gap-[10px]'}>
              <div className={'flex flex-col gap-[5px]'}>
                <div className={'flex items-center justify-between'}>
                  <Text className={'text-[16px] font-bold'}>업무 시간 외 알림 금지 설정</Text>
                  <ToggleSwitch isSwitch={true} onSwitch={() => {}} />
                </div>
                <Text className={'text-[14px] font-medium text-gray-600!'}>
                  9시 ~ 18시 외 발생하는 푸시알림 유무를 선택합니다.
                </Text>
              </div>
              <div className={'flex flex-col gap-[5px]'}>
                <div className={'flex items-center justify-between'}>
                  <Text className={'text-[16px] font-bold'}>자정 시간 알림 금지 설정</Text>
                  <ToggleSwitch isSwitch={true} onSwitch={() => {}} />
                </div>
                <Text className={'text-[14px] font-medium text-gray-600!'}>
                  0시 ~ 6시까지 발생하는 푸시알림 유무를 선택합니다.
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className={'flex flex-col gap-[30px] rounded-[12px] bg-white p-[20px]'}>
          <h3 className={'font-pretendard text-[22px] font-bold'}>이용 안내</h3>
          <div className={'flex flex-col gap-[20px]'}>
            <Text
              className={'text-[16px] font-medium'}
              onClick={() => openSideModal(MoreServiceUse, '서비스 이용약관')}
            >
              서비스 이용약관
            </Text>
            <Text className={'text-[16px] font-medium'}>1:1 문의내역</Text>
          </div>
        </div>
        <div className={'flex flex-col gap-[30px] rounded-[12px] bg-white p-[20px]'}>
          <h3 className={'font-pretendard text-[22px] font-bold'}>계정</h3>
          <div className={'flex flex-col gap-[20px]'}>
            <Text className={'text-[16px] font-medium'} onClick={() => openSideModal(MoreUserPw, '비밀번호 변경')}>
              비밀번호 변경
            </Text>
            <Text className={'text-[16px] font-medium'}>로그아웃</Text>
            <Text className={'text-gray400! text-[16px] font-medium'}>회원 탈퇴</Text>
          </div>
        </div>
      </section>
    </div>
  )
}
