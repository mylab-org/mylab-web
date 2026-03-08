import { useSideModalStore } from '@/shared/store'
import { Tag, Text } from '@/shared/ui'
import { WorkConferenceDetail } from '@/widgets/work-side-content'

export const ConferenceWorkWrap = () => {
  const openSideModal = useSideModalStore(state => state.openSideModal)

  return (
    <section className={'flex gap-[30px] p-[10px]'}>
      <section className={'flex w-[373] flex-col gap-[30px]'}>
        <h4 className={'font-pretendard text-[22px] font-bold'}>연구 준비</h4>
        <div className={'flex flex-col gap-[10px]'}>
          <div
            className={
              'bg-gray100 border-gray300 flex min-h-[165px] items-center justify-center rounded-[12px] border-2 border-dashed p-[20px]'
            }
          >
            <Text className={'text-gray400! text-[18px] font-semibold'}>아이템을 이곳에 드래그하여 옮길 수 있어요</Text>
          </div>
        </div>
      </section>
      <section className={'flex w-[373] flex-col gap-[30px]'}>
        <h4 className={'font-pretendard text-[22px] font-bold'}>실험 진행</h4>
        <div className={'flex flex-col gap-[10px]'}>
          <div
            className={'flex min-h-[165px] flex-col items-center gap-[20px] rounded-[12px] p-[20px] shadow-lg'}
            onClick={() => openSideModal(WorkConferenceDetail, '2026 한국통신학회 추계종합학술발표회')}
          >
            <div className={'flex w-full flex-col gap-[5px]'}>
              <h5 className={'font-pretendard text-[20px] font-bold'}>2026 한국통신학회 추계종합학술발표회</h5>
              <div className={'flex flex-col'}>
                <Text className={'text-[16px] font-normal'}>
                  26.02.04(수) ~ 26.02.06(금), <b className={'font-bold'}>마감 D-27</b>
                </Text>
                <Text className={'text-[16px] font-normal'}>모나 용평(용평리조트)</Text>
              </div>
            </div>
            <div className={'flex w-full flex-wrap gap-[10px]'}>
              <Tag.Member name={'홍길동'} />
            </div>
          </div>
        </div>
      </section>
      <section className={'flex w-[373] flex-col gap-[30px]'}>
        <h4 className={'font-pretendard text-[22px] font-bold'}>초안 작성</h4>
        <div className={'flex flex-col gap-[10px]'}>
          <div
            className={
              'bg-gray100 border-gray300 flex min-h-[165px] items-center justify-center rounded-[12px] border-2 border-dashed p-[20px]'
            }
          >
            <Text className={'text-gray400! text-[18px] font-semibold'}>아이템을 이곳에 드래그하여 옮길 수 있어요</Text>
          </div>
        </div>
      </section>
      <section className={'flex w-[373] flex-col gap-[30px]'}>
        <h4 className={'font-pretendard text-[22px] font-bold'}>교수 검토</h4>
        <div className={'flex flex-col gap-[10px]'}>
          <div
            className={
              'border-error flex min-h-[165px] flex-col items-center gap-[20px] rounded-[12px] border-3 p-[20px] shadow-lg'
            }
          >
            <div className={'flex w-full flex-col gap-[5px]'}>
              <h5 className={'font-pretendard text-[20px] font-bold'}>2026 한국통신학회 추계종합학술발표회</h5>
              <div className={'flex flex-col'}>
                <Text className={'text-[16px] font-normal'}>
                  26.02.04(수) ~ 26.02.06(금), <b className={'text-error font-bold'}>마감 D-27</b>
                </Text>
                <Text className={'text-[16px] font-normal'}>모나 용평(용평리조트)</Text>
              </div>
            </div>
            <div className={'flex w-full flex-wrap gap-[10px]'}>
              <Tag.Member name={'홍길동'} />
            </div>
          </div>
        </div>
      </section>
      <section className={'flex w-[373] flex-col gap-[30px]'}>
        <h4 className={'font-pretendard text-[22px] font-bold'}>완료</h4>
        <div className={'flex flex-col gap-[10px]'}>
          <div
            className={
              'flex min-h-[165px] flex-col items-center gap-[20px] rounded-[12px] bg-gray-200 p-[20px] shadow-lg'
            }
          >
            <div className={'flex w-full flex-col gap-[5px]'}>
              <h5 className={'font-pretendard text-[20px] font-bold'}>2026 한국통신학회 추계종합학술발표회</h5>
              <div className={'flex flex-col'}>
                <Text className={'text-[16px] font-normal'}>
                  26.02.04(수) ~ 26.02.06(금), <b className={'font-bold'}>마감 D-27</b>
                </Text>
                <Text className={'text-[16px] font-normal'}>모나 용평(용평리조트)</Text>
              </div>
            </div>
            <div className={'flex w-full flex-wrap gap-[5px]'}>
              <Tag.Member name={'홍길동'} />
              <Tag.Member name={'홍길동'} />
              <Tag.Member name={'홍길동'} />
              <Tag.Member name={'홍길동'} />
              <Tag.Member name={'홍길동'} />
              <Tag.Member name={'홍길동'} />
              <Tag.Member name={'홍길동'} />
              <Tag.Member name={'홍길동'} />
              <Tag.Member name={'홍길동'} />
              <Tag.Member name={'홍길동'} />
              <Tag.Member name={'홍길동'} />
              <Tag.Member name={'홍길동'} />
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
