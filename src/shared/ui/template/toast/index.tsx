'use client'

import { useTheme } from 'next-themes'
import { Flip, ToastContainer } from 'react-toastify'

export const Toast = () => {
  const { resolvedTheme } = useTheme()

  return (
    <ToastContainer
      position="bottom-center"
      autoClose={2000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      transition={Flip}
      closeButton={false}
      className="text-foreground w-[300px] font-bold"
      style={{ bottom: '60px', left: '50%', transform: 'translateX(-50%)' }}
      toastClassName={context => {
        const base = 'w-[300px] text-[13px] font-bold h-[40px] flex justify-center items-center rounded-xl border'
        const variants = {
          success:
            'bg-green-100 text-green-800 border-green-200 dark:bg-green-950 dark:text-green-200 dark:border-green-800',
          error: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-200 dark:border-red-800',
          info: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-200 dark:border-blue-800',
          warning:
            'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-200 dark:border-yellow-800',
          default: 'bg-popover text-popover-foreground border-border',
        }

        return `${base} ${variants[context?.type || 'default']}`
      }}
    />
  )
}
