'use client'

import { useRouter } from 'next/dist/client/components/navigation'
import { GNB_ITEM } from '@/shared/constant/nav'
import { PageGnbItem } from '@/widgets/menu/ui/page-gnb-item'

export const MobileBottomBar = () => {
  const router = useRouter()
  return (
    <aside
      className={
        'fixed bottom-0 z-[30] w-full rounded-t-[20px] border-t border-r border-l border-gray-100 bg-white px-[10px] py-[7px]'
      }
    >
      <ul className={'flex w-full items-center justify-around'}>
        {GNB_ITEM.map(({ name, path, Icon }) => (
          <PageGnbItem device={'mobile'} itemName={name} path={path} onItemClick={() => router.push(path)}>
            <Icon />
          </PageGnbItem>
        ))}
      </ul>
    </aside>
  )
}
