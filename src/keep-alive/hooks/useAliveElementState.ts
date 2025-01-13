import { useEffect, useMemo, useRef } from 'react'

type CallbackType = () => void

export function useAliveElementState(active: boolean) {
  const activatedRef = useRef<CallbackType[]>([])
  const deactivatedRef = useRef<CallbackType[]>([])

  const registerActivated = (callback: CallbackType) => {
    activatedRef.current.push(callback)
  }

  const registerDeactivated = (callback: CallbackType) => {
    deactivatedRef.current.push(callback)
  }

  useEffect(() => {
    const callbacks = active ? activatedRef.current : deactivatedRef.current

    // 调用激活 失活回调
    for (const callback of callbacks) {
      callback()
    }
  }, [active])

  return useMemo(
    () => ({
      registerActivated,
      registerDeactivated,
    }),
    [],
  )
}
