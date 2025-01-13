import type { ExoticComponent } from 'react'
import React, { Suspense } from 'react'
import type { ActivityProps } from './typings'
import { Wrapper } from './Wrapper'

const ReactActivity: ExoticComponent<ActivityProps> | undefined =
  Reflect.get(React, 'Activity') ?? Reflect.get(React, 'unstable_Activity')

export function Activity(props: ActivityProps) {
  const { mode, children } = props

  if (ReactActivity) {
    return <ReactActivity mode={mode}>{children}</ReactActivity>
  }

  return (
    <Suspense>
      <Wrapper mode={mode}>{children}</Wrapper>
    </Suspense>
  )
}
