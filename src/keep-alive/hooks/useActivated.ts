import { useLayoutEffect } from 'react'
import { useAliveElementContext } from '../context/AliveElement'

export function useActivated(callback: () => void) {
  const { registerActivated } = useAliveElementContext()

  useLayoutEffect(() => {
    const destory = registerActivated(callback)
    return () => destory()
  }, [])
}
