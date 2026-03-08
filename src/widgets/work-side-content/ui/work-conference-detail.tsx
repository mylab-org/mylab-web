import { Image } from 'next/dist/client/image-component'
import { WorkMyProgress } from '@/entities/works'
import { Tag, Text } from '@/shared/ui'

export const WorkConferenceDetail = () => {
  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col lg:w-[750px]'}>
      <section className={'flex flex-col gap-[10px] border-b border-b-gray-200 px-[20px] pb-[10px] lg:px-[30px]'}>
        <div className={'flex items-center gap-[10px]'}>
          <Image src={'icon/icon_work_date.svg'} alt={''} width={20} height={20} />
          <div className={'flex items-center gap-[5px]'}>
            <Text className={'text-[16px] font-medium'}>26.02.04(수) ~ 26.02.06(금)</Text>
            <div className={'bg-gray100 font-pretendard rounded-[8px] px-[10px] py-[5px] text-[12px] font-bold'}>
              제출마감 D-5
            </div>
          </div>
        </div>
        <div className={'flex items-center gap-[10px]'}>
          <Image src={'icon/icon_work_location.svg'} alt={''} width={20} height={20} />
          <Text className={'text-[16px] font-medium'}>모나 용평(용평리조트)</Text>
        </div>
        <div className={'flex items-center gap-[10px]'}>
          <Image src={'icon/icon_work_member.svg'} alt={''} width={20} height={20} />
          <div className={'flex flex-wrap gap-[10px]'}>
            <Tag.Member name={'홍길동'} />
            <Tag.Member name={'홍길동'} />
            <Tag.Member name={'홍길동'} />
            <Tag.Member name={'홍길동'} />
          </div>
        </div>
      </section>
      <section className={'flex min-h-0 flex-1'}>
        <div className={'flex flex-1 flex-col gap-[10px] border-r border-r-gray-200 px-[15px] py-[10px]'}>
          <h4 className={'font-pretendard text-[20px] font-bold'}>업무 진척도</h4>
          <div className={'flex flex-col gap-[30px] p-[10px]'}>
            <div className={'flex flex-col gap-[15px]'}>
              <div className={'flex items-center gap-[10px]'}>
                <div className={'h-[25px] w-[25px] rounded-full bg-gray-200'} />
                <Text className={'text-[18px] font-bold'}>홍길동</Text>
                <div className={'flex gap-[4px]'}>
                  <Tag.Roll variant={'leader'} />
                  <Tag.Roll variant={'doctoral'} />
                </div>
              </div>
              <WorkMyProgress />
            </div>
            <div className={'flex flex-col gap-[15px]'}>
              <div className={'flex items-center gap-[10px]'}>
                <div className={'h-[25px] w-[25px] rounded-full bg-gray-200'} />
                <Text className={'text-[18px] font-bold'}>홍길동</Text>
                <div className={'flex gap-[4px]'}>
                  <Tag.Roll variant={'leader'} />
                  <Tag.Roll variant={'doctoral'} />
                </div>
              </div>
              <WorkMyProgress />
            </div>
            <div className={'flex flex-col gap-[15px]'}>
              <div className={'flex items-center gap-[10px]'}>
                <div className={'h-[25px] w-[25px] rounded-full bg-gray-200'} />
                <Text className={'text-[18px] font-bold'}>홍길동</Text>
                <div className={'flex gap-[4px]'}>
                  <Tag.Roll variant={'leader'} />
                  <Tag.Roll variant={'doctoral'} />
                </div>
              </div>
              <WorkMyProgress />
            </div>
          </div>
        </div>
        <div className={'flex min-h-0 flex-1 flex-col gap-[10px]'}>
          <div className={'flex min-h-0 flex-1 flex-col gap-[10px] px-[15px] py-[10px]'}>
            <h4 className={'font-pretendard text-[20px] font-bold'}>업무 소통란</h4>
            <div className={'flex flex-1 flex-col gap-[10px] overflow-y-auto p-[10px]'}>
              <div className={'flex flex-col gap-[4px]'}>
                <div className={'flex items-center gap-[4px]'}>
                  <div className={'h-[16px] w-[16px] rounded-full bg-gray-200'} />
                  <Text className={'text-[14px] font-semibold'}>홍길동</Text>
                </div>
                <div
                  className={
                    'font-pretendard w-fit max-w-[90%] rounded-[12px] bg-slate-100 p-[10px] text-[14px] font-normal'
                  }
                >
                  참여자들과 의견을 나누어보세요
                </div>
              </div>
              <div className={'flex flex-col gap-[4px]'}>
                <div className={'flex items-center gap-[4px]'}>
                  <div className={'h-[16px] w-[16px] rounded-full bg-gray-200'} />
                  <Text className={'text-[14px] font-semibold'}>홍길동</Text>
                </div>
                <div
                  className={
                    'font-pretendard w-fit max-w-[90%] rounded-[12px] bg-slate-100 p-[10px] text-[14px] font-normal'
                  }
                >
                  참여자들과 의견을 나누어보세요
                </div>
              </div>
              <div className={'flex flex-col gap-[4px]'}>
                <div className={'flex items-center gap-[4px]'}>
                  <div className={'h-[16px] w-[16px] rounded-full bg-gray-200'} />
                  <Text className={'text-[14px] font-semibold'}>홍길동</Text>
                </div>
                <div
                  className={
                    'font-pretendard w-fit max-w-[90%] rounded-[12px] bg-slate-100 p-[10px] text-[14px] font-normal'
                  }
                >
                  참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과
                  의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을
                  나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요
                </div>
              </div>
              {/*  나 */}
              <div className={'flex justify-end'}>
                <div
                  className={
                    'font-pretendard w-fit max-w-[90%] rounded-[12px] bg-slate-100 p-[10px] text-[14px] font-normal'
                  }
                >
                  참여자들과 의견을 나누어보세요 참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과
                  의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을
                  나누어보세요참여자들과 의견을 나누어보세요
                </div>
              </div>
              <div className={'flex justify-end'}>
                <div
                  className={
                    'font-pretendard w-fit max-w-[90%] rounded-[12px] bg-slate-100 p-[10px] text-[14px] font-normal'
                  }
                >
                  참여자들과 의견을 나누어보세요 참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과
                  의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을
                  나누어보세요참여자들과 의견을 나누어보세요
                </div>
              </div>
              <div className={'flex justify-end'}>
                <div
                  className={
                    'font-pretendard w-fit max-w-[90%] rounded-[12px] bg-slate-100 p-[10px] text-[14px] font-normal'
                  }
                >
                  참여자들과 의견을 나누어보세요 참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과
                  의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을
                  나누어보세요참여자들과 의견을 나누어보세요
                </div>
              </div>
              <div className={'flex justify-end'}>
                <div
                  className={
                    'font-pretendard w-fit max-w-[90%] rounded-[12px] bg-slate-100 p-[10px] text-[14px] font-normal'
                  }
                >
                  참여자들과 의견을 나누어보세요 참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과
                  의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을
                  나누어보세요참여자들과 의견을 나누어보세요
                </div>
              </div>
              <div className={'flex justify-end'}>
                <div
                  className={
                    'font-pretendard w-fit max-w-[90%] rounded-[12px] bg-slate-100 p-[10px] text-[14px] font-normal'
                  }
                >
                  참여자들과 의견을 나누어보세요 참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과
                  의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을
                  나누어보세요참여자들과 의견을 나누어보세요
                </div>
              </div>
              <div className={'flex justify-end'}>
                <div
                  className={
                    'font-pretendard w-fit max-w-[90%] rounded-[12px] bg-slate-100 p-[10px] text-[14px] font-normal'
                  }
                >
                  참여자들과 의견을 나누어보세요 참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과
                  의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을 나누어보세요참여자들과 의견을
                  나누어보세요참여자들과 의견을 나누어보세요
                </div>
              </div>
            </div>
          </div>
          <div className={'flex flex-col gap-[10px] bg-[#FAFAFA] p-[10px]'}>
            <Text className={'text-[14px] font-semibold text-gray-500!'}>홍길동</Text>
            <textarea
              className={
                'font-pretendard border-gray400 placeholder:text-gray400 h-[80px] border bg-white p-[5px] text-[14px] font-normal outline-0'
              }
              placeholder={'참여자들과 의견을 나누어보세요'}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
