import { Suspense } from 'react'
import { LabLabInfoSkeleton, LabUserDataSkeleton, LabWorkingSkeleton } from '@/shared/ui/template/section-skeleton/lab'
import {
  LabLabInfoServerSection,
  LabMenuWrapper,
  LabUserDataServerSection,
  LabWorkingServerSection,
} from '@/widgets/lab'

export const MainPage = () => {
  return (
    <div className={'flex flex-1 flex-col justify-center gap-7.5 focus:outline-none'}>
      <div className={'flex flex-1 gap-7.5'}>
        <Suspense fallback={<LabUserDataSkeleton />}>
          <LabUserDataServerSection />
        </Suspense>

        <section className={'flex flex-1 flex-col gap-7.5'}>
          <LabMenuWrapper type={'top'} />
          <div className={'flex min-h-0 flex-1 gap-7.5'}>
            <Suspense fallback={<LabLabInfoSkeleton />}>
              <LabLabInfoServerSection />
            </Suspense>
            <Suspense fallback={<LabWorkingSkeleton />}>
              <LabWorkingServerSection />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  )
}
