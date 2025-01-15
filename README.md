# @z-cloud/react-keep-alive

## install

```bash
pnpm add @z-cloud/react-keep-alive
```

## with `react-router`

```ts
import { Link, type UIMatch, useLocation, useMatches, useOutlet } from 'react-router'
import { KeepAlive, KeepAliveProvider } from '@z-cloud/react-keep-alive'

export function Layout() {
  const { pathname } = useLocation()
  const outlet = useOutlet()
  const matches = useMatches() as UIMatch<unknown, { keepAlive?: boolean }>[]
  const keepALive = matches.at(-1)?.handle?.keepAlive ?? false

  return (
    <KeepAliveProvider>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <KeepAlive id={pathname} keepAlive={keepALive}>
        {outlet}
      </KeepAlive>
    </KeepAliveProvider>
  )
}
```

## `useActions`

```ts
import { useActions } from '@z-cloud/react-keep-alive'

function Com() {
  const { remount, clear, getActivatedIds, getDeactivatedIds } = useActions()

  // remount 重新挂载指定组件，不传参数则挂载所有已激活组件
  // clear 清除指定缓存，不传参数则全部清除
  // getActivatedIds 获取已激活的组件ids
  // getDeactivatedIds 获取已失活的组件ids
  return 'Com'
}
```

## `useActivated` and `useDeactivated`

```ts
import { useActivated, useDeactivated } from '@z-cloud/react-keep-alive'

function Com() {
  useActivated(() => console.log('Com activated'))
  useDeactivated(() => console.log('Com deactivated'))

  return 'Com'
}
```

## `Activity` 谨慎使用，持续关注官方 `Activity` 实现

> 如果你使用的 `react` 版本包含 `Activity` 或者 `unstable_Activity` 则使用react提供的组件，否则使用 `Suspense` 模拟实现

```ts
import { Activity } from '@z-cloud/react-keep-alive'

<Activity mode="visible"></Activity>
```
