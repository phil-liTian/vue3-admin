/*
 * @Date: 2024-02-27 20:30:56
 * @LastEditors: phil_litian
 * 动态处理页面标题
 */
import { useTitle as usePageTitle } from '@vueuse/core'
import { useGlobalSetting } from '../setting/index'
import { useRouter, useRoute } from 'vue-router'
import { unref, watch } from 'vue'
import { useI18n } from '@h/web/useI18n'

// 动态更新页面title => document.title
export const useTitle = () => {
  const pageTitle = usePageTitle()
  const { currentRoute } = useRouter()
  const route = useRoute()
  const { t } = useI18n()
  
  const { title } = useGlobalSetting()

  watch(() => currentRoute.value.path, () => {
    
    const route = unref(currentRoute)
    const tTitle = route?.meta?.title ? t(route?.meta?.title) : ''
    
    pageTitle.value = tTitle ? `${tTitle}-${title}` : title
  }, { immediate: true } )
}