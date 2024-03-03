/*
 * @Date: 2024-03-03 14:10:50
 * @LastEditors: phil_litian
 */
import { getMenus } from '@/router/routes/menus'
import { ref } from 'vue'

export const useSplitMenu = () => {
  let menusRef = ref()
  

  const genMenus = async () => {
    const menus = await getMenus()

    menusRef.value = menus
  }

  genMenus()

  return { menusRef }
}

