import { LabLabInfoSection, LabMenuWrapper, LabUserDataSection, LabWorkingSection } from '@/widgets/lab'

export const MainPage = () => {
  return (
    <div className={'flex flex-1 flex-col justify-center gap-7.5 focus:outline-none'}>
      <div className={'flex flex-1 gap-7.5'}>
        <LabUserDataSection />

        <section className={'flex flex-1 flex-col gap-7.5'}>
          <LabMenuWrapper type={'top'} />
          <div className={'flex min-h-0 flex-1 gap-7.5'}>
            <LabLabInfoSection />
            <LabWorkingSection />
          </div>
        </section>
      </div>
    </div>
  )
}
