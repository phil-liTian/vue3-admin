/*
 * @Date: 2024-03-30 17:17:50
 * @LastEditors: phil_litian
 */

import { ref, unref } from 'vue';
import { ReturnMethods, DrawerInstance, UseDrawerReturnType } from './typing'


export function useDrawer(): UseDrawerReturnType {
  const drawerRef = ref<Nullable<DrawerInstance>>(null)
  
  const register = (drawerInstance: DrawerInstance) => {
    // 注册实例对象
    drawerRef.value = drawerInstance
  }

  const getInstance = () => {
    const instance = unref(drawerRef)
    if ( !instance ) {
      return
    }
    return instance
  }

  const methods: ReturnMethods = {
    setDrawerProps: () => {
      
    },

    openDrawer(open = true) {
      getInstance()?.setDrawerProps({
        open
      })
    }
  }

  return [ register, methods as ReturnMethods ]
}

export function useDrawerInner() {

}

