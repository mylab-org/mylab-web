'use client'

import { useRouter } from 'next/dist/client/components/navigation'
import { GNB_ITEM } from '@/shared/constant/nav'
import { PageGnbItem } from '@/widgets/menu/ui/page-gnb-item'

export const PageGnb = () => {
  const router = useRouter()
  return (
    <aside className={'fixed z-10 h-full rounded-tr-[24px] rounded-br-[24px] bg-white px-[20px] pt-[30px]'}>
      <ul className={'flex flex-col gap-[24px]'}>
        {GNB_ITEM.map(({ name, path, Icon }) => (
          <PageGnbItem itemName={name} path={path} onItemClick={() => router.push(path)}>
            <Icon />
          </PageGnbItem>
        ))}
      </ul>
    </aside>
  )
}
