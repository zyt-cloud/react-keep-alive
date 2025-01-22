import { Link, UIMatch, useMatches, useOutlet } from 'react-router'
import { KeepAlive, KeepAliveProvider } from '@z-cloud/react-keep-alive'

export function Layout() {
  const match = (useMatches() as UIMatch<unknown, { keepAlive?: boolean; keepId?: string }>[]).at(-1)
  const keepALive = match?.handle?.keepAlive ?? false
  const outlet = useOutlet()
  // 动态路由获取 params 示例 请查看 about 页面
  const id = match!.id

  return (
    <KeepAliveProvider>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/1">About 1</Link>
          </li>
          <li>
            <Link to="/about/2">About 2</Link>
          </li>
          <li>
            <Link to="/about/3">About 3</Link>
          </li>
          <li>
            <Link to="/dashboard">Messages (Dashboard)</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <KeepAlive id={id} keepAlive={keepALive}>
        {outlet}
      </KeepAlive>
    </KeepAliveProvider>
  )
}
