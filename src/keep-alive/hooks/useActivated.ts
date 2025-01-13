import { useEffect } from 'react'
import { useAliveElementContext } from '../context/AliveElement'

export function useActivated(callback: () => void) {
  const { registerActivated } = useAliveElementContext()

  useEffect(() => {
    registerActivated(callback)
  }, [])
}
