import { LAB_NAV } from '@/shared/constant/nav'
import { LabTopMenu } from '@/widgets/lab-top-menu/ui/lab-menu-item'

export const LabMenuWrapper = () => {
  return (
    <div className={'flex gap-[30px]'}>
      {LAB_NAV.map(({ name, Icon, isAdmin }) => (
        <LabTopMenu name={name}>
          <Icon />
        </LabTopMenu>
      ))}
    </div>
  )
}
