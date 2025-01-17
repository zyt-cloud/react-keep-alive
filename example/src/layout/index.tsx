import { Link, UIMatch, useLocation, useMatches, useOutlet } from 'react-router'
import { KeepAlive, KeepAliveProvider } from '@z-cloud/react-keep-alive'

export function Layout() {
  const { pathname } = useLocation()
  const outlet = useOutlet()
  const matches = useMatches() as UIMatch<unknown, { keepAlive?: boolean; keepId?: string }>[]
  const keepALive = matches.at(-1)?.handle?.keepAlive ?? false
  // 动态路由示例 请查看 about 页面
  const id = matches.at(-1)?.handle?.keepId ?? pathname

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
