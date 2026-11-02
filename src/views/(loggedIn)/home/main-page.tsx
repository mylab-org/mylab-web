import { Suspense } from 'react'
import {
  LabLabInfoSkeleton,
  LabScheduleSkeleton,
  LabWelcomeSkeleton,
  LabWorkingSkeleton,
} from '@/shared/ui/template/section-skeleton/lab'
import {
  LabLabInfoServerSection,
  LabMenuWrapper,
  LabScheduleServerSection,
  LabWelcomeServerSection,
  LabWorkingServerSection,
} from '@/widgets/lab'

export const MainPage = () => {
  return (
    <div className={'flex flex-1 flex-col gap-6 focus:outline-none'}>
      <div className={'flex flex-col gap-4 xl:flex-row xl:items-stretch'}>
        <Suspense fallback={<LabWelcomeSkeleton />}>
          <LabWelcomeServerSection />
        </Suspense>
        <LabMenuWrapper />
      </div>

      <div className={'grid min-h-0 flex-1 grid-cols-1 gap-6 lg:grid-cols-2'}>
        <Suspense fallback={<LabScheduleSkeleton />}>
          <LabScheduleServerSection />
        </Suspense>
        <Suspense fallback={<LabWorkingSkeleton />}>
          <LabWorkingServerSection />
        </Suspense>
      </div>

      <Suspense fallback={<LabLabInfoSkeleton />}>
        <LabLabInfoServerSection />
      </Suspense>
    </div>
  )
}
