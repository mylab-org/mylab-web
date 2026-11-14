'use client'

import { Plus } from 'lucide-react'
import { LabLinkItem } from '@/entities/labs'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
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
        <h3 className={'text-[18px] leading-7 font-bold md:text-[20px]'}>연구활동 링크</h3>
        {canManage && (
          <button
            type={'button'}
            onClick={() => setIsOpen(true)}
            className={
              'bg-brand inline-flex cursor-pointer items-center gap-1 rounded-[10px] px-3 py-1.5 text-[12px] font-semibold text-white'
            }
          >
            <Plus className={'h-3.5 w-3.5'} />
            등록
          </button>
        )}
      </div>
      {links.length === 0 ? (
        <div
          className={
            'border-border bg-muted/50 flex flex-col items-center justify-center gap-1.5 rounded-[12px] border border-dashed px-4 py-6'
          }
        >
          <p className={'text-muted-foreground text-[13px] font-medium md:text-[14px]'}>등록된 링크가 없습니다</p>
          <p className={'text-subtle-foreground text-[12px] font-medium'}>
            연구 활동에 사용되는 링크들을 추가해보세요!
          </p>
        </div>
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
