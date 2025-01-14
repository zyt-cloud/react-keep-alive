import type { CacheElementType, Identifier } from '../typings'

export class CacheNode {
  private capacity: number
  private cache: Map<Identifier, CacheElementType>

  constructor(capacity: number) {
    this.capacity = capacity
    this.cache = new Map()
  }

  has(key: Identifier) {
    return this.cache.has(key)
  }

  get(key: Identifier) {
    if (this.has(key)) {
      const element = this.cache.get(key)
      // 更新顺序
      this.cache.delete(key)
      this.cache.set(key, element!)

      return element
    }
  }

  add(key: Identifier, value: CacheElementType) {
    if (this.has(key)) {
      this.cache.delete(key)
    }
    // 等于缓存数量 淘汰最后使用的
    else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value!)
    }

    this.cache.set(key, value)
  }

  clearDomRef(element: CacheElementType) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    element.portalDomNode = null
  }

  clear(id?: Identifier | Identifier[]) {
    if (id === void 0) {
      for (const element of this.cache.values()) {
        this.clearDomRef(element)
      }
      this.cache.clear()
      return
    }

    const ids = [id].flat(1)

    for (const clearId of ids) {
      if (this.has(clearId)) {
        this.clearDomRef(this.cache.get(clearId)!)
        this.cache.delete(clearId)
      }
    }
  }

  toArray() {
    return [...this.cache.values()]
  }
}

let instance: CacheNode | undefined

// 返回缓存单例实例
export const createCacheInstance = (capacity: number) => {
  if (instance === void 0) {
    instance = new CacheNode(capacity)
  }
  return instance
}
