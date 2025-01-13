export type Identifier = string | number | symbol

export interface KeepAliveProps {
  children: React.ReactNode
  // 标识符 全局唯一
  id: Identifier
  active?: boolean
  /**
   * 是否保持组件状态
   * @default true
   */
  keepAlive?: boolean
  className?: string
}

export interface KeepAliveProviderProps {
  /**
   * 缓存容量
   * @default 500
   */
  capacity?: number
}
export type CacheElementType = {
  id: Identifier
  element: React.ReactNode
  key: React.Key
  portalDomNode: HTMLElement
}
