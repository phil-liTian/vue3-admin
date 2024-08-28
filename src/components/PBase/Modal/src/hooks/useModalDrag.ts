/*
 * @Date: 2024-04-17 15:09:21
 * @LastEditors: phil_litian
 */
import { useTimeoutFn } from '@vueuse/core'
import { Ref, unref, watchEffect } from 'vue';


interface UseModalDragMoveContext {
  open: Ref<boolean>;
  draggable: Ref<boolean>;
  destroyOnClose: Ref<boolean | undefined> | undefined
}


export function useDragMove(context: UseModalDragMoveContext) {

  const getStyle = (dom: any, attr: any) => {
    return getComputedStyle(dom)[attr]
  }

  function drag(wrap) {
    if ( !wrap ) return
    wrap.setAttribute('data-drag', unref(context.draggable))
    const dialogHeaderEl: HTMLElement = document.querySelector('.ant-modal-header')
    const dragDom: HTMLElement = document.querySelector('.ant-modal')

    // 鼠标变成move
    dialogHeaderEl.style.cursor = 'move'

    // 点击header拖拽
    dialogHeaderEl.onmousedown = (e: any) => {
      if(!e) return
      // 当前元素距离可视区的距离(点击时的偏移量)
      const disX = e.clientX;
      const disY = e.clientY;

      // target: 计算最大左右移动和上下移动偏移量
      const clientWidth = document.body.clientWidth
      const clentHeight = document.body.clientHeight
      const dragDomWidth = dragDom.offsetWidth; // modal宽度
      const dragDomHeight = dragDom.offsetHeight // modal高度
      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = clientWidth - dragDomWidth - minDragDomLeft
      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = clentHeight - dragDomHeight - minDragDomTop
      

      // 计算dom的距离左边和上边的距离
      const domLeft = getStyle(dragDom, 'left')
      const domTop = getStyle(dragDom, 'top')
      const styL = +domLeft.replace(/px/g, '')
      const styT = +domTop.replace(/px/g, '')

      document.onmousemove = (e) => {
        // 移动时偏移量为当前鼠标位置减去点击时鼠标位置
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 限制拖拽范围(边界处理)
        if ( -left > minDragDomLeft ) {
          // 左移到最左边
          left = -minDragDomLeft
        } else if ( left > maxDragDomLeft ) {
          left = maxDragDomLeft
        }

        if ( -top > minDragDomTop ) {
          // 上移
          top = -minDragDomTop
        } else if ( top > maxDragDomTop ) {
          top = maxDragDomTop
        }

        // 控制modal位置(举例说明：当前距离左侧距离为，鼠标移动位置 + 鼠标点击时移动元素距离左侧位置)
        dragDom.style.cssText = `;left: ${left + styL}px;top: ${top + styT}px`
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
  
  function handleDrag() {
    const dragWraps = document.querySelectorAll('.ant-modal-wrap')

    for (const wrap of Array.from(dragWraps)) {
      const display = getStyle(wrap, 'display')
      const draggable = wrap.getAttribute('data-drag')
      if ( display !== 'none' ) {
        if ( draggable === null ) {
          drag(wrap)
        }
      }
    }
  }

  watchEffect(() => {
    if ( !unref(context.open) || !unref(context.draggable) ) return
    useTimeoutFn(() => {
      handleDrag()
    }, 30)
  })
}
