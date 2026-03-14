import clsx from 'clsx'

interface ToggleSwitchProps {
  isSwitch: boolean
  onSwitch: () => void
}

export const ToggleSwitch = ({ onSwitch, isSwitch }: ToggleSwitchProps) => {
  return (
    <button
      type="button"
      onClick={onSwitch}
      className={clsx(
        'relative flex cursor-pointer items-center rounded-full transition-colors duration-200',
        'h-[14px] w-[22px] lg:h-[24px] lg:w-[40px]',
        isSwitch ? 'bg-gray-700' : 'bg-gray-200',
      )}
    >
      <span
        className={clsx(
          'absolute rounded-full bg-white shadow-md transition-transform duration-200',
          'h-[10px] w-[10px] lg:h-[18px] lg:w-[18px]',
          isSwitch ? 'translate-x-[10px] lg:translate-x-[18px]' : 'translate-x-[2px]',
        )}
      />
    </button>
  )
}
