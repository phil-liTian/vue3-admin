/*
 * @Date: 2024-07-27 16:30:43
 * @LastEditors: phil_litian
 */
import type { Directive } from 'vue'

export interface RippleOptions {
  event: string;
  transition: number
}

const options: RippleOptions = {
  event: 'mousedown',
  transition: 500
}

const setProps = (modifiers: Recordable, props: Recordable) => {
  modifiers.forEach((item: Recordable) => {
    if ( Number(item) ) {
      props.event = item
    } else {
      props.transition = item
    }
  })
}

const rippler = ({ event, el, zIndex, background }) => {
  const { transition } = options
  const style = getComputedStyle(el)
  const rect = el.getBoundingClientRect()
  const { left, top } = rect
  const { offsetWidth: width, offsetHeight: height } = el
  
  const clientX = event.clientX
  const clientY = event.clientY

  // 在区域内部的横纵坐标偏移量
  const dx = clientX - left
  const dy = clientY - top
  const maxX = Math.max(dx, width - dx)
  const maxY =  Math.max(dy, height - dy)

  const radius = Math.sqrt(maxX * maxX + maxY * maxY)

  const ripple = document.createElement('div')
  ripple.className = 'ripple'

  Object.assign(ripple.style || {}, {
    width: '1px',
    height: '1px',
    borderRadius: '50%',
    transition: `all ${transition}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    backgroundColor: 'rgba(0, 0, 0, 0.12)'
  })

  const rippleContainer = document.createElement('div')
  rippleContainer.className = 'ripple-container'
  Object.assign(rippleContainer.style || {}, {
    position: 'absolute',
    width: 0,
    height: 0
  })

  rippleContainer.appendChild(ripple)
  el.appendChild(rippleContainer)

  Object.assign(rippleContainer.style || {}, {
    width: `${width}px`,
    height: `${height}px`,
    direction: 'ltr'
  })



  setTimeout(() => {
    const wh = `${radius * 2}px`
    Object.assign(ripple.style || {}, {
      width: wh,
      height: wh,
      marginLeft: `${dx - radius}px`,
      marginTop: `${dy - radius}px`
    })
  }, 0);
}

const RippleDirective: Directive = {
  beforeMount(el: HTMLElement, binding: any) {
    // 改变options
    setProps(Object.keys(binding.modifiers), options)

    el.addEventListener(options.event, (event: Event) => {
      // console.log('event', event);
      rippler({
        event,
        el,
        zIndex: 999,
        background: el.getAttribute('ripple-background') || 'rgba(0, 0, 0, 0.2)'
      })
    })
  },

  updated() {
    console.log('updated');
  },
}

export default RippleDirective