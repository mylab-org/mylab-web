'use client'

import { useRouter } from 'next/dist/client/components/navigation'
import { PageGnbItem } from './page-gnb-item'
import { GNB_ITEM } from '@/shared/constant/nav'
import { CARD_SHADOW } from '@/shared/constant/skeleton'

export const PageGnb = () => {
  const router = useRouter()
  return (
    <aside className={`bg-card fixed z-10 h-full rounded-tr-[24px] rounded-br-[24px] px-5 pt-7.5 ${CARD_SHADOW}`}>
      <ul className={'flex flex-col gap-6'}>
        {GNB_ITEM.map(({ name, path, Icon }) => (
          <PageGnbItem key={name} itemName={name} path={path} onItemClick={() => router.push(path)}>
            <Icon />
          </PageGnbItem>
        ))}
      </ul>
    </aside>
  )
}
