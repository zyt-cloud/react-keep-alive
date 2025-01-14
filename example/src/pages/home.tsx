import { useState } from 'react'
import { useActions } from '@z-cloud/react-keep-alive'

export default function Home() {
  const [count, setCount] = useState(0)
  const { clear } = useActions()

  return (
    <div>
      <h2>Home Page</h2>
      <button onClick={() => clear()}>清楚所有缓存页面</button>
      <button onClick={() => setCount(count + 1)}>click count: {count}</button>
      <input />
    </div>
  )
}
