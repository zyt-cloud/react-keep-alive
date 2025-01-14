import { createBrowserRouter } from 'react-router'
import { Layout } from '../layout'
import Home from '../pages/home'
import About from '../pages/about'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        handle: { keepAlive: true },
        element: <About />,
      },
      {
        path: 'dashboard',
        async lazy() {
          // Multiple routes in lazy file
          const { DashboardLayout } = await import('../pages/dashboard')
          return { Component: DashboardLayout }
        },
        children: [
          {
            index: true,
            async lazy() {
              const { DashboardIndex } = await import('../pages/dashboard')
              return { Component: DashboardIndex }
            },
          },
          {
            path: 'messages',
            handle: { keepAlive: true },
            async lazy() {
              const { DashboardMessages } = await import('../pages/dashboard')
              return {
                Component: DashboardMessages,
              }
            },
          },
        ],
      },
      {
        path: '*',
        element: <h2>NoMatch</h2>,
      },
    ],
  },
])
