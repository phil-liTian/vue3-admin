/*
 * @Date: 2024-02-24 12:06:37
 * @LastEditors: phil_litian
 */
import { computed } from 'vue'
import { useAppStore } from '@s/modules/app'
import { ThemeEnum } from '@/enums/appEnum'

// 基础设置钩子
export const useRootSetting = () => {
  const appStore = useAppStore()
  
  // 获取主题模式
  const getDarkMode = computed(() => appStore.getDarkMode)

  // 设置主题模式
  const setDarkMode = (mode: ThemeEnum) => appStore.setDarkMode(mode)

  
  return {
    getDarkMode,
    setDarkMode
  }
}