/*
 * @Date: 2024-03-24 21:15:01
 * @LastEditors: phil_litian
 */

import { CSSProperties, ComponentInternalInstance, computed, unref } from 'vue'

export const useMenuItem = (instance: Nullable<ComponentInternalInstance>) => {

  const getParentMenu = computed(() => {
    return findParentMenu(['Menu', 'subMenu'])
  })

  const getParentRootMenu = computed(() => {
    return findParentMenu(['Menu'])
  })

  const getParentSubMenu = computed(() => {
    return findParentMenu(['subMenu'])
  })

  const getItemStyle = computed((): CSSProperties => {
    let parent = instance.parent
    if ( !parent ) return {}

    const indentSize = (unref(getParentRootMenu).props.indentSize as number) ?? 20;
    let padding = indentSize
    while(parent && parent.type.name !== 'Menu') {
      if ( parent.type.name === 'SubMenu' ) {
        padding += indentSize
      }

      parent = parent.parent
    }
    
    
    return {
      paddingLeft: `${padding}px`
    }
  })

  function findParentMenu(names: string[]) {
    let parent = instance.parent
    if ( !parent ) return null
    while(parent && names.includes(parent.type.name)) {
      parent = parent.parent
    }

    return parent
  }

  return { getItemStyle }
}