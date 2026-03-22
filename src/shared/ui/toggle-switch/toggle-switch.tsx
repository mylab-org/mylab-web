import clsx from 'clsx'
import { cn } from '@/shared/lib'

interface ToggleSwitchProps {
  isSwitch: boolean
  onSwitch: () => void
  title?: React.ReactNode
  description?: React.ReactNode
  isBetween?: boolean
  className?: string
}

export const ToggleSwitch = ({
  className,
  onSwitch,
  isSwitch,
  title,
  isBetween = false,
  description,
}: ToggleSwitchProps) => {
  return (
    <div className={cn('flex flex-col gap-2.5 py-2.5', className)}>
      <div className={`flex items-center gap-2 ${isBetween && 'justify-between'}`}>
        {title}
        <button
          type="button"
          onClick={onSwitch}
          className={clsx(
            'relative flex cursor-pointer items-center rounded-full transition-colors duration-200',
            'h-3.5 w-5.5 lg:h-6 lg:w-10',
            isSwitch ? 'bg-gray-700' : 'bg-gray-200',
          )}
        >
          <span
            className={clsx(
              'absolute rounded-full bg-white shadow-md transition-transform duration-200',
              'h-2.5 w-2.5 lg:h-4.5 lg:w-4.5',
              isSwitch ? 'translate-x-2.5 lg:translate-x-4.5' : 'translate-x-0.5',
            )}
          />
        </button>
      </div>
      {description}
    </div>
  )
}
