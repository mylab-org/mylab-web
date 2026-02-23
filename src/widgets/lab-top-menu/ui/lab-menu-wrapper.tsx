import { LAB_NAV, MOBILE_LAB_DETAIL_NAV } from '@/shared/constant/nav'
import { useSideModalStore } from '@/shared/store/useSideModalStore'
import { LabTopMenu } from '@/widgets/lab-top-menu/ui/lab-menu-item'

export const LabMenuWrapper = ({ type }: { type: 'top' | 'center' }) => {
  const setIsSideOpen = useSideModalStore(state => state.setIsSideOpen)

  return (
    <div className={'flex gap-[10px] md:gap-[30px]'}>
      {type === 'top'
        ? LAB_NAV.map(({ name, Icon, isAdmin }) => (
            <LabTopMenu key={name} name={name} onClick={() => setIsSideOpen(true)}>
              <Icon className={'h-full w-full'} />
            </LabTopMenu>
          ))
        : MOBILE_LAB_DETAIL_NAV.map(({ name, Icon }) => (
            <LabTopMenu key={name} name={name} onClick={() => setIsSideOpen(true)}>
              <Icon className={'h-full w-full'} />
            </LabTopMenu>
          ))}
    </div>
  )
}
