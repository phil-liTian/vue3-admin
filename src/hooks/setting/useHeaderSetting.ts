/*
 * @Date: 2024-04-03 16:53:26
 * @LastEditors: phil_litian
 */
import { HeaderSetting } from '#/config'
import { useAppStore } from '@s/modules/app'
import { computed, unref } from 'vue'

export function useHeaderSetting() {
  const appStore = useAppStore()

  // 是否展示顶部内容
  const getShowHeader = computed(() => appStore.getHeaderSetting.show)
  
  const getShowSearch = computed(() => appStore.getHeaderSetting.showSearch)

  const setHeaderSetting = (headerSetting: Partial<HeaderSetting>) => {
    appStore.setHeaderSetting(headerSetting)
  }

  const getShowInsetHeader = computed(() => {
    const need = unref(getShowHeader)

    return need
  })

  return {
    getShowHeader,
    getShowSearch,
    setHeaderSetting,
    getShowInsetHeader
  }
}
