import { memo, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { AliveElementContext } from '../context/AliveElement'
import { useAliveElementState } from '../hooks/useAliveElementState'
import type { KeepAliveProps } from '../typings'
import { type CacheNode } from '../utils/cache'

type WrapperPrps = KeepAliveProps & { placeholderNode: Comment; cacheInstance: CacheNode }

export const Wrapper = memo(({ id, children, placeholderNode, active = false, cacheInstance }: WrapperPrps) => {
  const aliveNodeState = useAliveElementState(active)
  const { portalDomNode } = cacheInstance.get(id)!

  useLayoutEffect(() => {
    try {
      if (active) {
        placeholderNode.after(portalDomNode)
      } else {
        portalDomNode.remove()
      }
    } catch (error) {
      console.error(error)
    }
  }, [active, placeholderNode])

  return (
    <AliveElementContext.Provider value={aliveNodeState}>
      {createPortal(children, portalDomNode)}
    </AliveElementContext.Provider>
  )
})
