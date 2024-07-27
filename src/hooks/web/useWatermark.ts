/*
 * @Date: 2024-07-27 11:09:22
 * @LastEditors: phil_litian
 * 快捷创建一个水印
 */
import { getCurrentInstance, Ref, ref, shallowRef, unref } from 'vue'

type UseWatermarkRes = {
  setWatermark: (str: string) => void;
  clear: () => void;
  clearAll: () => void;
  parentElement?: HTMLElement;
  targetElement?: HTMLElement;
}
const watermarkSymbol = 'watermark-dom'
const sourceMap = new Map<Symbol, Omit<UseWatermarkRes, 'clearAll'>>()
const UpdateWatermarkText = ref<Nullable<string>>(null)

// 将文字转化成base64 图片格式
function createBase64(str: string) {
  const canvas = document.createElement('canvas')
  const width = 500;
  const height = 240

  // 给canvas添加属性width和height
  Object.assign(canvas, { width, height })
  const cans = canvas.getContext('2d')
  if (canvas) {
    cans.rotate(- Math.PI / 9)
    cans.font = '15px Vedana'
    cans.textAlign = 'left'
    cans.fillStyle = 'rgba(0, 0, 0, 0.15)';
    cans.textBaseline = 'middle'
    cans.fillText(str, width / 2, height)
  }
  return canvas.toDataURL('image/png')
}

const resetWatermarkStyle = (element: HTMLElement, str: string) => {
  element.style.left = '0px'
  element.style.top = '0px'
  element.style.position = 'absolute'
  element.style.width = '100%'
  element.style.height = '100%'
  // 鼠标点击、鼠标悬停（hover）等鼠标操作对该元素将无效，鼠标事件会“穿透”该元素，直接作用到其下方的元素上。
  element.style.pointerEvents = 'none'
  element.style.zIndex = '100000'
  // element.style.background = `url(${createBase64(str)}) left top repeat`
}

// 清空sourceMap中元素
function clearAll() {
  sourceMap.forEach(({ clear }) => {
    clear()
  })
}

export function useWatermark(
  appendEl: Ref<Nullable<HTMLElement>> = ref(document.body) as Ref<HTMLElement>,
): UseWatermarkRes {
  const domSymbol = Symbol(watermarkSymbol)
  const watermarkEl = shallowRef<HTMLElement>()

  // 更新水印的样式
  const updateWatermark = (options: {
    str?: string,
    width?: number,
    height?: number
  } = {}) => {
    const el = unref(watermarkEl)
    if ( options.width ) {
      el.style.width = `${options.width}px`
    }

    if ( options.height ) {
      el.style.height = `${options.height}px`
    }

    if ( options.str ) {
      el.style.background = `url(${createBase64(options.str)}) left top repeat`
    }
  }

  // resize的时候 需要重新计算element的宽、高
  const func = () => {
    const el = unref(appendEl)
    if ( !el ) return
    const { clientHeight: height, clientWidth: width } = el
    updateWatermark({ width, height })
  }
  
  // 清空水印
  const clear = () => {
    const domId = unref(watermarkEl)
    const el = unref(appendEl)
    // clear的时候 需清除sourceMap中对应的数据 否则clear会报异常
    sourceMap.delete(domSymbol)
    if ( !el ) return
    domId && el.removeChild(domId)
    window.removeEventListener('resize', func)
  }

  // 创建一个水印的dom结构
  const createWatermark = (str: string) => {
    if ( unref(watermarkEl) && sourceMap.get(domSymbol) ) {
      updateWatermark({ str })
      return
    }
    
    const div = document.createElement('div')
    div['data-watermark-text'] = str
    watermarkEl.value = div
    resetWatermarkStyle(div, str)
    const el = unref(appendEl)
    if ( !el ) return
    const { clientHeight: height, clientWidth: width } = el
    updateWatermark({ str, width, height })
    el.appendChild(div)
    sourceMap.set(domSymbol, {
      setWatermark,
      clear,
      // parentElement: el,
      // targetElement: div,
    })
  }

  function setWatermark (str: string) {
    createWatermark(str)
    window.addEventListener('resize', func)
    // const instance = getCurrentInstance()
    // console.log('instance', instance);
  }

  return { setWatermark, clear, clearAll }
}
