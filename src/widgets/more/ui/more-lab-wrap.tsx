'use client'

import { LabIntro } from '@/entities/lab'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { Button, Text } from '@/shared/ui'
import { MoreMenuWrap } from '@/widgets/more/ui/more-menu-wrap'
import { MoreLabMember, MoreLabUpdate } from '@/widgets/more-side-content'

export const MoreLabWrap = () => {
  const openSideModal = useSideModalStore(state => state.openSideModal)

  return (
    <section className={'flex flex-1 shrink-0 flex-col gap-[10px]'}>
      <div className={'flex flex-col gap-[20px] rounded-[12px] bg-white p-[24px]'}>
        <div className={'flex flex-col gap-[14px]'}>
          <LabIntro />
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
      <MoreMenuWrap title={'연구원 관리'}>
        <>
          <Text className={'text-[12px] font-medium whitespace-pre-wrap text-gray-600! md:text-[14px]'}>
            {`연구실에 가입된 인원들을 관리할 수 있어요.\n랩장 권한 설정, 학적 변경이 가능합니다.`}
          </Text>
          <Button
            className={'bg-gray100! text-gray900! flex items-center justify-center gap-[4px] text-[16px]'}
            onClick={() => openSideModal(MoreLabMember, '연구원 관리')}
          >
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
        </>
      </MoreMenuWrap>
    </section>
  )
}
