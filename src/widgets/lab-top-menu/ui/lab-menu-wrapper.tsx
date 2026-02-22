import { LAB_NAV, MOBILE_LAB_DETAIL_NAV } from '@/shared/constant/nav'
import { LabTopMenu } from '@/widgets/lab-top-menu/ui/lab-menu-item'

export const LabMenuWrapper = ({ type }: { type: 'top' | 'center' }) => {
  return (
    <div className={'flex gap-[10px] md:gap-[30px]'}>
      {type === 'top'
        ? LAB_NAV.map(({ name, Icon, isAdmin }) => (
            <LabTopMenu key={name} name={name}>
              <Icon className={'h-full w-full'} />
            </LabTopMenu>
          ))
        : MOBILE_LAB_DETAIL_NAV.map(({ name, Icon }) => (
            <LabTopMenu key={name} name={name}>
              <Icon className={'h-full w-full'} />
            </LabTopMenu>
          ))}
    </div>
  )
}
