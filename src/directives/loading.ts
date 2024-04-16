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
    
  },

  unmounted(el, binding) {
    el?.instance?.close()
  }
}

export default loadingDirective


export function setupLoadingDirective(app: App) {
  app.directive('loading', loadingDirective)
}

