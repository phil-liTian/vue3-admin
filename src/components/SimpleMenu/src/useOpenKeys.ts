/*
 * @Date: 2024-03-29 17:54:51
 * @LastEditors: phil_litian
 */

import { Ref, computed, unref } from "vue"
import { uniq } from 'lodash-es'
import { MenuState } from "./types"
import { Menu } from "@/router/types"
import { getAllParentPath } from "@/router/helper/menuHelper"


export function useOpenKeys(
    menuState: MenuState, 
    menus: Ref<Menu[]>, 
    accordion: Ref<boolean>
  ) {
  const setOpenKeys = (path) => {
    
    const menuList = menus.value

    const keys = getAllParentPath(menuList, path)
    
    if ( !unref(accordion) ) {
      // 去重处理
      menuState.openNames = uniq([...keys, ...menuState.openNames])
      
    } else {
      menuState.openNames = keys
    }
  }

  const getOpenKeys = computed(() => {
    
    return menuState.openNames
  })

  return { setOpenKeys, getOpenKeys }
}

