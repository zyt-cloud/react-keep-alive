import { useState } from 'react'
import { useActivated, useDeactivated, useActions } from '@z-cloud/react-keep-alive'

export default function About() {
  const [count, setCount] = useState(0)
  const { remount } = useActions()

  useActivated(() => console.log('About activated'))
  useDeactivated(() => console.log('About deactivated'))

  return (
    <div>
      <h2>About Page - keepAlive</h2>
      <button onClick={() => remount()}>重新挂载当前页面</button>
      <button onClick={() => setCount(count + 1)}>click count: {count}</button>
      <input />
    </div>
  )
}
