import { Fragment, memo, useLayoutEffect, useRef, useState } from 'react'
import { useKeepAliveContext } from '../context/KeepAlive'
import type { Identifier, KeepAliveProps } from '../typings'
import { createPortalDomNode, invariant } from '../utils'
import { Wrapper } from './Wrapper'

export const KeepAlive = memo(
  ({ id, children, active, className, keepAlive = true }: KeepAliveProps) => {
    invariant(id, 'KeepAlive 缺少prop: id, 且全局唯一')
    const { cacheInstance, remountKey } = useKeepAliveContext()
    const [commentNode] = useState(() => document.createComment('KeepAlive placeholder'))
    const [domReady, setDomReady] = useState(false)

    // 帮助确定组件放置位置
    const placeholderRef = useRef<HTMLSpanElement>(null)
    const idsRef = useRef<Set<Identifier>>()

    idsRef.current ??= new Set()
    idsRef.current.add(id)

    if (keepAlive && !cacheInstance.has(id)) {
      cacheInstance.add(id, {
        id,
        key: `${String(id)}-${Date.now()}`,
        element: children,
        portalDomNode: createPortalDomNode(className),
      })
    } else if (cacheInstance.has(id) && !keepAlive) {
      cacheInstance.clear(id)
    }

    // 属于当前keepAlive缓存的组件
    const elements = cacheInstance.toArray().filter((element) => idsRef.current!.has(element.id))

    useLayoutEffect(() => {
      // 使用注释标签代替元素占位 减少额外元素
      placeholderRef.current?.after(commentNode)
      setDomReady(true)
    }, [commentNode])

    return (
      <>
        {!keepAlive && <Fragment key={`${String(id)}-${remountKey}`}>{children}</Fragment>}
        {!domReady && <span ref={placeholderRef} />}
        {domReady &&
          elements.map((node) => (
            <Wrapper
              key={node.key}
              id={node.id}
              cacheInstance={cacheInstance}
              placeholderNode={commentNode}
              active={active === void 0 ? node.id === id : active}
            >
              {node.element}
            </Wrapper>
          ))}
      </>
    )
  },
  (prev, next) => {
    const compareKeys: (keyof KeepAliveProps)[] = ['id', 'className', 'active', 'keepAlive']
    return compareKeys.every((key) => prev[key] === next[key])
  },
)
