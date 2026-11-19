import type { EquipmentResponseType, RentalResponseType } from '@/entities/equipment'
import { Text } from '@/shared/ui/override/text'

interface LabRentalItemProps {
  equipment: EquipmentResponseType
}

const padTwo = (value: number) => String(value).padStart(2, '0')

/** yy.mm.dd hh:mm */
const formatRentalAt = (value: string) => {
  const date = new Date(value)

  return `${String(date.getFullYear()).slice(2)}.${padTwo(date.getMonth() + 1)}.${padTwo(date.getDate())} ${padTwo(date.getHours())}:${padTwo(date.getMinutes())}`
}

const getProgress = (rental: RentalResponseType) => {
  const start = new Date(rental.startAt).getTime()
  const end = new Date(rental.endAt).getTime()
  const now = Date.now()

  if (now <= start) return 0
  if (now >= end || end <= start) return 100

  return Math.round(((now - start) / (end - start)) * 100)
}

export const LabRentalItem = ({ equipment }: LabRentalItemProps) => {
  const { name, imageUrl, isRentable, rentals } = equipment
  const [rental] = rentals

  return (
    <div className={'flex gap-2.5 p-2.5'}>
      <div className={'bg-muted h-[50px] w-[50px] shrink-0 overflow-hidden rounded-[10px] lg:h-[100px] lg:w-[100px]'}>
        {/* 비품 이미지는 임의 외부 URL 이라 next/image 대신 img 사용 */}
        {imageUrl && <img src={imageUrl} alt={name} className={'h-full w-full object-cover'} />}
      </div>
      <div className={'flex flex-1 flex-col justify-between gap-2.5 lg:px-2.5 lg:py-1.25'}>
        <div className={'flex flex-1 flex-col gap-2.5'}>
          <Text className={'text-[14px] font-bold lg:text-[24px]'}>{name}</Text>
          <Text className={'text-muted-foreground! text-[10px] font-semibold lg:text-[14px]'}>
            {rental
              ? `${rental.userName} 대여 | ${formatRentalAt(rental.startAt)} ~ ${formatRentalAt(rental.endAt)}`
              : isRentable
                ? '대여 가능'
                : '대여 불가'}
          </Text>
        </div>
        {rental && (
          <div className={'flex flex-col gap-1'}>
            <div className={'bg-muted relative flex h-2.5 overflow-hidden rounded-[24px]'}>
              <div className={'bg-brand h-2.5 rounded-[24px]'} style={{ width: `${getProgress(rental)}%` }} />
            </div>
            <div className={'flex items-center justify-between'}>
              <Text className={'text-muted-foreground! text-[8px] font-semibold lg:text-[14px]'}>
                {formatRentalAt(rental.startAt)}
              </Text>
              <Text className={'text-muted-foreground! text-[8px] font-semibold lg:text-[14px]'}>
                {formatRentalAt(rental.endAt)}
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
