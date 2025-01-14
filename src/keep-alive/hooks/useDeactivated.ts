import { useLayoutEffect } from 'react'
import { useAliveElementContext } from '../context/AliveElement'

export function useDeactivated(callback: () => void) {
  const { registerDeactivated } = useAliveElementContext()

  useLayoutEffect(() => {
    const destory = registerDeactivated(callback)
    return () => destory()
  }, [])
}
