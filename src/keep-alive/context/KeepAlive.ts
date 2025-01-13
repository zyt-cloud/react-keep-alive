import { createContext, useContext } from 'react'
import { invariant } from '../utils'
import { type CacheNode } from '../utils/cache'

export interface KeepAliveContextProps {
  cacheInstance: CacheNode
  remountKey: string
  update: () => void
}

export const KeepAliveContext = createContext<KeepAliveContextProps | null>(null)

export function useKeepAliveContext() {
  const ctx = useContext(KeepAliveContext)
  invariant(ctx, 'KeepAlive 必须在 KeepAliveProvider 组件内使用')
  return ctx
}
