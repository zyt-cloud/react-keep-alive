export function invariant(value: boolean, message?: string): asserts value

export function invariant<T>(value: T | null | undefined, message?: string): asserts value is T

export function invariant(value: any, message?: string) {
  if (value === false || value === null || typeof value === 'undefined') {
    throw new Error(message)
  }
}

export function createPortalDomNode(className?: string) {
  const sectionElement = document.createElement('section')
  sectionElement.classList.add('keep-alive-item')
  if (className) {
    sectionElement.classList.add(className)
  }
  return sectionElement
}
