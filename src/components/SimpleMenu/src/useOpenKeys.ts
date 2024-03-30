/*
 * @Date: 2024-03-29 17:54:51
 * @LastEditors: phil_litian
 */

import { computed } from "vue"
import { MenuState } from "./types"


export function useOpenKeys(menuState: MenuState) {
  const setOpenKeys = (path) => {
    

    menuState.openNames = [path]
  }

  const getOpenKeys = computed(() => menuState.openNames)

  return { setOpenKeys, getOpenKeys }
}

