import React, { useRef } from 'react'
import type { ActivityProps } from './typings'

export function Wrapper(props: ActivityProps) {
  const { mode, children } = props
  const promiseRef = useRef<Promise<void>>()
  const resolveRef = useRef<() => void>()

  if (mode === 'hidden') {
    promiseRef.current = new Promise((resolve) => {
      resolveRef.current = resolve
    })

    const promise = promiseRef.current
    if (Reflect.has(React, 'use')) {
      // @ts-ignore
      React.use(promise)
    } else {
      throw promise
    }
  }

  if (resolveRef.current) {
    resolveRef.current()
    resolveRef.current = void 0
    promiseRef.current = void 0
  }

  return <>{typeof children === 'function' ? children(mode) : children}</>
}
