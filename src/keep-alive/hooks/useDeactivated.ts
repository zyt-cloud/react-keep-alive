import { useEffect } from 'react'
import { useAliveElementContext } from '../context/AliveElement'

export function useDeactivated(callback: () => void) {
  const { registerDeactivated } = useAliveElementContext()

  useEffect(() => {
    registerDeactivated(callback)
  }, [])
}
