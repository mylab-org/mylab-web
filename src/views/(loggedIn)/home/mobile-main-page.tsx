import { Suspense } from 'react'
import {
  LabMobileCenterSkeleton,
  LabMobileTopSkeleton,
  LabScheduleSkeleton,
  LabWorkingSkeleton,
} from '@/shared/ui/template/section-skeleton/lab'
import {
  LabMenuWrapper,
  LabMobileCenterServerSection,
  LabMobileTopServerSection,
  LabScheduleServerSection,
  LabWorkingServerSection,
} from '@/widgets/lab'

export const MobileMainPage = () => {
  return (
    <section className={'flex w-full flex-col gap-4 overflow-x-hidden px-5'}>
      <Suspense fallback={<LabMobileTopSkeleton />}>
        <LabMobileTopServerSection />
      </Suspense>

      <Suspense fallback={<LabScheduleSkeleton />}>
        <LabScheduleServerSection isMobile />
      </Suspense>

      <Suspense fallback={<LabWorkingSkeleton />}>
        <LabWorkingServerSection isMobile />
      </Suspense>

      <LabMenuWrapper />

      <Suspense fallback={<LabMobileCenterSkeleton />}>
        <LabMobileCenterServerSection />
      </Suspense>
    </section>
  )
}
