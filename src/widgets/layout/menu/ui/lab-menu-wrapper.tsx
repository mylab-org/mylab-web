import { LabTopMenu } from './lab-menu-item'
import { LAB_NAV, MOBILE_LAB_DETAIL_NAV } from '@/shared/constant/nav'
import { useSideModalStore } from '@/shared/store/useSideModalStore'

export const LabMenuWrapper = ({ type }: { type: 'top' | 'center' }) => {
  const openSideModal = useSideModalStore(state => state.openSideModal)

  return (
    <div className={'flex gap-2.5 md:gap-7.5'}>
      {type === 'top'
        ? LAB_NAV.map(({ name, Icon, isAdmin, content }) => (
            <LabTopMenu key={name} name={name} onClick={() => openSideModal(content, name)}>
              <Icon className={'h-full w-full'} />
            </LabTopMenu>
          ))
        : MOBILE_LAB_DETAIL_NAV.map(({ name, Icon, content }) => (
            <LabTopMenu key={name} name={name} onClick={() => openSideModal(content, name)}>
              <Icon className={'h-full w-full'} />
            </LabTopMenu>
          ))}
    </div>
  )
}
