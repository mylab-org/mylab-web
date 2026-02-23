import { useEffect } from 'react'

function getBodyScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth
}

export const useLockBodyScroll = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      document.body.style.paddingRight = getBodyScrollbarWidth() + 'px'
      document.body.style.overflow = 'hidden'
      console.log(getBodyScrollbarWidth())
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    return () => {
      // document.body.style.removeProperty('--scrollbar-width')
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    }
  }, [isLocked])
}
