import { useMemo, useState, type PropsWithChildren } from 'react'
import { CAPACITY } from '../constants'
import { KeepAliveContext } from '../context/KeepAlive'
import type { KeepAliveProviderProps } from '../typings'
import { createCacheInstance } from '../utils/cache'

export function KeepAliveProvider({ children, capacity = CAPACITY }: PropsWithChildren<KeepAliveProviderProps>) {
  const [remountKey, update] = useState(`${Date.now()}`)

  const ctx = useMemo(() => {
    return {
      remountKey,
      // TODO 是否动态更新缓存容量
      cacheInstance: createCacheInstance(capacity),
      update: () => update(`${Date.now()}`),
    }
  }, [remountKey])

  return <KeepAliveContext.Provider value={ctx}>{children}</KeepAliveContext.Provider>
}
