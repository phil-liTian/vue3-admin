import { Directive } from "vue"
import { usePermissions } from '@h/web/usePermissions'


const authDirective: Directive = {
  mounted(el, binding) {
    const { hasPermission } = usePermissions()
    const { value } = binding
    if ( !value ) return
    if ( !hasPermission(value) ) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}

export const setupPermissionDirective = (app) => {
  app.directive('auth', authDirective)
}