import { createVNode, render } from 'vue'
import ImgPreview from './Functional.vue'
import { Options, Props } from './typing'

let instance: Nullable<ReturnType<typeof createVNode>> = null
export function createImgPreview(options: Options) {
  const container = document.createElement('div')

  const propsData: Partial<Props> = {}
  Object.assign(propsData, { show: true }, options)
  instance = createVNode(ImgPreview, propsData)

  // 将instance渲染到container上
  render(instance, container)
  document.body.appendChild(container)
}
