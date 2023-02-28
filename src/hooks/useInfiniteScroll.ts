import { MutableRefObject, useEffect } from 'react'

export interface UseInfiniteScrollOption {
  callback?: () => void
  triggerRef: MutableRefObject<HTMLElement>
  wrapperRef: MutableRefObject<HTMLElement>
}

export const useInfiniteScroll = ({
  wrapperRef,
  callback,
  triggerRef,
}: UseInfiniteScrollOption) => {
  useEffect(() => {
    let observer: IntersectionObserver | null = null
    const wrapperElement = wrapperRef.current
    const triggerElement = triggerRef.current
    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0,
      }

      observer = new IntersectionObserver(([entrie]) => {
        if (entrie.isIntersecting) {
          callback()
        }
      }, options)

      observer.observe(triggerElement)
    }
    return () => {
      if (observer && triggerElement) {
        observer.unobserve(triggerElement)
      }
    }
  }, [wrapperRef, triggerRef, callback])
}
