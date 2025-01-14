import { Link, Outlet } from 'react-router'
import { useActivated, useDeactivated } from '@z-cloud/react-keep-alive'

export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard Page</h2>
    </div>
  )
}

export function DashboardLayout() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">Dashboard Home</Link>
          </li>
          <li>
            <Link to="/dashboard/messages">Messages</Link>
          </li>
        </ul>
      </nav>
      layoutInput: <input />
      <hr />
      <Outlet />
    </div>
  )
}

export function DashboardIndex() {
  return (
    <div>
      <h2>Dashboard Index</h2>
      <input />
    </div>
  )
}

export function DashboardMessages() {
  useActivated(() => console.log('DashboardMessages activated'))
  useDeactivated(() => console.log('DashboardMessages deactivated'))

  return (
    <div>
      <h2>DashboardMessages - keepAlive</h2>
      <input />
    </div>
  )
}
