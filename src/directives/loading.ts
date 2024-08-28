/*
 * @Date: 2024-04-16 10:23:13
 * @LastEditors: phil_litian
 */
import { App, ObjectDirective } from "vue";
import { createLoading } from '@c/Loading/index'
import { SizeEnum } from "@/enums/sizeEnum";

const loadingDirective: ObjectDirective = {
  mounted(el, binding) {
    const tip = el.getAttribute('loading-tip')
    const size = el.getAttribute('loading-size')
    const background = el.getAttribute('loading-background')
    const fullScreen = !!binding.modifiers.fullScreen
    
    const instance = createLoading({
      tip,
      size: size || SizeEnum.LARGE,
      background,
      loading: !!binding.value,
      absolute: !fullScreen
    }, fullScreen ? document.body : el)
    el.instance = instance
  },

  updated(el, binding) {
    const instance = el.instance
    if ( !instance ) return
    instance.setTip(el.getAttribute('loading-tip'));
    
    if ( binding.oldValue !== binding.value ) {
      instance.setLoading(binding.value)
    }
  },

  unmounted(el, binding) {
    el?.instance?.close()
  }
}

export default loadingDirective


export function setupLoadingDirective(app: App) {
  app.directive('loading', loadingDirective)
}

