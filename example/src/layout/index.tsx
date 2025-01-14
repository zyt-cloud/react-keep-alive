import { Link, UIMatch, useLocation, useMatches, useOutlet } from 'react-router'
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
          <li>
            <Link to="/dashboard">Messages (Dashboard)</Link>
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
