import { useKeepAliveContext } from '../context/KeepAlive'
import { Identifier } from '../typings'

export function useActions() {
  const { cacheInstance, update } = useKeepAliveContext()

  /**
   * 获取所有已激活的id
   * @returns ids
   */
  const getActivatedIds = () => {
    return cacheInstance
      .toArray()
      .filter((element) => element.portalDomNode.parentNode !== null)
      .map((element) => element.id)
  }

  /**
   * 获取所有未激活的id
   * @returns ids
   */
  const getDeactivatedIds = () => {
    return cacheInstance
      .toArray()
      .filter((element) => element.portalDomNode.parentNode === null)
      .map((element) => element.id)
  }

  /**
   * 清除指定id的缓存，不传则全部清除
   * @param ids 单个id 或者id的数组
   */
  const clear = (ids?: Identifier | Identifier[]) => {
    cacheInstance.clear(ids)
  }

  /**
   * 重新挂载组件，不传则所有激活组件重新挂载
   * @param ids
   */
  const remount = (ids?: Identifier | Identifier[]) => {
    const remountIds = ids === void 0 ? getActivatedIds() : [ids].flat(1)
    cacheInstance.clear(remountIds)
    update()
  }

  return {
    clear,
    remount,
    getActivatedIds,
    getDeactivatedIds,
  }
}
