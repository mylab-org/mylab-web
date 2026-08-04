import { LabMenuWrapper, LabMobileCenterSection, LabMobileTopSection } from '@/widgets/lab'

export const MobileMainPage = () => {
  return (
    <section className={'flex flex-1 flex-col gap-2.5 px-5'}>
      <LabMenuWrapper type={'top'} />
      <LabMobileTopSection />
      <LabMenuWrapper type={'center'} />
      <LabMobileCenterSection />
    </section>
  )
}
