/*
 * @Date: 2024-04-09 09:29:27
 * @LastEditors: phil_litian
 */
import type { DirectiveBinding, ObjectDirective } from 'vue'
import { on } from '@u/domUtils'
import { isClient } from '@u/is'

type DocumentHandler =  <T extends MouseEvent>(mouseup: T, mousedown: T) => void
type FlushList = Map<HTMLElement, {
  documentHandler: DocumentHandler;
  bindingFn: (...args: unknown[]) => unknown
}>

let startClick: MouseEvent
const nodeList: FlushList = new Map()

if ( isClient ) {
  on(document, 'mousedown', (e: Event) => startClick = e as MouseEvent)
  on(document, 'mouseup', (e: Event) => {
    for (const { documentHandler } of nodeList.values()) {
      documentHandler(e as MouseEvent, startClick)
    } 
  })
}

function createDocumentHandler(el: HTMLElement, binding: DirectiveBinding): DocumentHandler {
  return (mouseup: MouseEvent, mousedown: MouseEvent) => {
    const mouseUpTarget = mouseup.target as Node
    const mouseDownTarget = mousedown.target as Node

    // 在当前绑定区域内
    const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget)
    // 就是当前元素本身
    const isSelf = el === mouseUpTarget
    // 当前点击的元素不存在
    const targetNotExist = !mouseDownTarget || !mouseUpTarget
    // 空的
    const isBound = !binding || !binding.instance

    if ( isContainedByEl || isSelf || targetNotExist || isBound) {
      return
    }

    binding.value()
  }
}

// 点击当前绑定区域外
const ClickOutside: ObjectDirective = {
  beforeMount(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    })
  },

  updated(el, binding) {
    nodeList.set(el, {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    })
  },

  unmounted(el) {
    nodeList.delete(el)
  }
}

export default ClickOutside