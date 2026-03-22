'use client'

import { MoreMenuWrap } from './more-menu-wrap'
import { MoreLabMember } from './side/more-lab-member'
import { MoreLabUpdate } from './side/more-lab-update'
import { LabInfo } from '@/entities/lab'
import { useConfirmStore } from '@/shared/store'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { Button } from '@/shared/ui/button'
import { Text } from '@/shared/ui/text'

interface WrapProps {
  isMaxWidth?: boolean
}

export const MoreLabWrap = ({ isMaxWidth = false }: WrapProps) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const onOpenConfirm = useConfirmStore(state => state.onOpenConfirm)

  return (
    <section className={`flex flex-[1_0_400px] flex-col gap-2.5 ${isMaxWidth && 'max-w-[550px]'}`}>
      <div className={'flex flex-col gap-5 rounded-[12px] bg-white md:p-6'}>
        <div className={'flex flex-col gap-3.5'}>
          <LabInfo />
          <Button
            className={'text-[12px]! md:text-[16px]!'}
            onClick={() => openSideModal(MoreLabUpdate, '연구실 정보 수정')}
          >
            수정하기
          </Button>
        </div>
        <div className={'flex flex-col gap-5'}>
          <div className={'flex flex-col gap-2.5'}>
            <h3 className={'text-[16px] font-bold md:text-[20px]'}>연구실 삭제</h3>
            <Text className={'text-[10px] font-medium whitespace-pre-wrap text-gray-600! md:text-[12px]'}>
              {`연구실 삭제 전, 데이터 백업이 이루어졌는지 확인해주세요.\n삭제 후 데이터를 복구할 방법이 없으며, 본 서비스는 일괄 책임지지 않습니다.`}
            </Text>
          </div>
          <Button
            className={'text-[12px]! md:text-[16px]!'}
            onClick={() => onOpenConfirm('정말 연구실을 삭제하시겠습니까?', () => console.log('연구실 삭제'))}
          >
            연구실 삭제
          </Button>
        </div>
      </div>
      <MoreMenuWrap title={'연구원 관리'}>
        <>
          <Text className={'text-[10px] font-medium whitespace-pre-wrap text-gray-600! md:text-[14px]'}>
            {`연구실에 가입된 인원들을 관리할 수 있어요.\n랩장 권한 설정, 학적 변경이 가능합니다.`}
          </Text>
          <Button
            className={
              'flex items-center justify-center gap-1 bg-gray-100! text-[12px]! text-gray-900! md:text-[16px]!'
            }
            onClick={() => openSideModal(MoreLabMember, '연구원 관리')}
          >
            <div className={'flex items-center gap-1'}>
              <div className={'flex items-center'}>
                <div className={'h-4 w-4 rounded-full border bg-gray-300 md:h-6.25 md:w-6.25'} />
                <div className={'-ml-2 h-4 w-4 rounded-full border bg-gray-300 md:-ml-3 md:h-6.25 md:w-6.25'} />
                <div className={'-ml-2 h-4 w-4 rounded-full border bg-gray-300 md:-ml-3 md:h-6.25 md:w-6.25'} />
              </div>
              <span className={'text-[12px] font-bold'}>+1</span>
            </div>
            연구원 전체 보기
          </Button>
        </>
      </MoreMenuWrap>
    </section>
  )
}
