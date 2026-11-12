'use client'

import { Image } from 'next/dist/client/image-component'
import { LabLinkItem } from '@/entities/labs'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Text } from '@/shared/ui/override/text'
import type { LabsLinkResponseType } from '../model/types'
import type { Dispatch, SetStateAction } from 'react'

interface LabLinkProps {
  links?: LabsLinkResponseType[]
  setIsOpen: Dispatch<SetStateAction<boolean>>
  canManage?: boolean
  onDeleteLink?: (link: LabsLinkResponseType) => void
  isDeleting?: boolean
}

export const LabLink = ({ links = [], setIsOpen, canManage = false, onDeleteLink, isDeleting }: LabLinkProps) => {
  return (
    <div className={cn('bg-card flex flex-col gap-3 rounded-[20px] p-5', CARD_SHADOW)}>
      <div className={'flex items-center justify-between'}>
        <h3 className={'text-[18px] leading-7 font-bold md:text-[20px]'}>링크</h3>
        {canManage && (
          <Image
            src={'/icon/icon_main_add.svg'}
            alt={'링크 추가'}
            width={30}
            height={30}
            className={'h-5 w-5 cursor-pointer md:h-6 md:w-6'}
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>
      {links.length === 0 ? (
        <Text className={'text-subtle-foreground text-[12px] md:text-[14px]'}>등록된 링크가 없습니다</Text>
      ) : (
        <div className={'flex flex-wrap gap-1.5'}>
          {links.map(link => (
            <LabLinkItem
              key={link.linkId}
              href={link.url}
              name={link.name}
              onDelete={canManage ? () => onDeleteLink?.(link) : undefined}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}
    </div>
  )
}
