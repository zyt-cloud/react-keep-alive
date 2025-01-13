import { createContext, useContext } from 'react'

interface AliveElementContextProps {
  registerActivated: (callback: () => void) => void
  registerDeactivated: (callback: () => void) => void
}

export const AliveElementContext = createContext<AliveElementContextProps>({
  registerActivated: () => void 0,
  registerDeactivated: () => void 0,
})

export function useAliveElementContext() {
  return useContext(AliveElementContext)
}
