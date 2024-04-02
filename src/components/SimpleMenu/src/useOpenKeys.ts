/*
 * @Date: 2024-03-29 17:54:51
 * @LastEditors: phil_litian
 */

import { Ref, computed } from "vue"
import { MenuState } from "./types"
import { Menu } from "@/router/types"
import { getAllParentPath } from "@/router/helper/menuHelper"


export function useOpenKeys(menuState: MenuState, menus: Ref<Menu[]>) {
  const setOpenKeys = (path) => {
    
    const menuList = menus.value

    const keys = getAllParentPath(menuList, path)
    
    menuState.openNames = keys
  }

  const getOpenKeys = computed(() => {
    
    return menuState.openNames
  })

  return { setOpenKeys, getOpenKeys }
}

