/*
 * @Date: 2024-07-23 13:24:44
 * @LastEditors: phil_litian
 */
import { getCurrentInstance } from 'vue'
import { createContextMenu, destroyContextMenu } from '@c/ContextMenu/index'

export function useContextMenu() {
  
  return [createContextMenu, destroyContextMenu]
}
