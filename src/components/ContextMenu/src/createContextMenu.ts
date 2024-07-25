import { ContextMenuProps, CreateContextOptions } from "./typing"
import ContextMenu from './ContextMenu.vue'
import { createVNode, render } from 'vue'

/*
 * @Date: 2024-07-23 13:28:45
 * @LastEditors: phil_litian
 */

const menuManager: {
  domList: Element[],
  resolve: Fn
} = {
  domList: [],
  resolve: () => {}
}

export const createContextMenu = (options: CreateContextOptions) => {
  const { event } = options
  // 阻止默认行为
  event && event.preventDefault()

  return new Promise((resolve, reject) => {
    const body = document.body
    const container = document.createElement('div')
    let propsData: Partial<ContextMenuProps> = {}

    if (options.items) {
      propsData.items = options.items
    }

    if ( options.event ) {
      const { clientX, clientY } = options.event
      propsData.axis = { x: clientX, y: clientY }
    }

    const vm = createVNode(ContextMenu, propsData)
    render(vm, container)
    const handleClick = () => {
      menuManager.resolve('')
    }
    
    const remove = function() {
      menuManager.domList.forEach((dom: Element) => {
        try {
          body.removeChild(dom)
        } catch(error) {
          // console.log('error', error);
        }
      })
    }

    menuManager.domList.push(container)
    menuManager.resolve = (arg) => {
      remove()
      resolve(arg)
    }
    // 此时remove body上还不存在当前container 会走到catch里面 对逻辑不影响
    remove()
    body.appendChild(container)
    // 点击和滚动都会移除
    body.addEventListener('click', handleClick)
    body.addEventListener('scroll', handleClick)
  })
}

export const destroyContextMenu = () => {
  
}

