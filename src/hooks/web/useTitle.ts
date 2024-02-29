/*
 * @Date: 2024-02-27 20:30:56
 * @LastEditors: phil_litian
 */
import { useTitle as usePageTitle } from '@vueuse/core'
import { useGlobalSetting } from '../setting/index'
import { useRouter } from 'vue-router'
import { unref, watch } from 'vue'

// 动态更新页面title => document.title
export const useTitle = () => {
  const pageTitle = usePageTitle()
  const { currentRoute } = useRouter()
  const { title } = useGlobalSetting()

  watch(() => currentRoute.value.path, () => {
    const route = unref(currentRoute)
    const tTitle = route.meta.title
    
    pageTitle.value = tTitle ? `${tTitle}-${title}` : title
  }, { immediate: true } )
}