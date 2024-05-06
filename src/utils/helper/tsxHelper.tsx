/*
 * @Date: 2024-04-16 20:25:20
 * @LastEditors: phil_litian
 */

import { Slots } from "vue";
import { isFunction } from "../is";

export function getSlot(slots: Slots, slot = 'default', data?: any ) {
  if ( !slots || !Reflect.has(slots, slot) ) return null
  
  if( !isFunction(slots[slot]) ) {
    console.error(`${slot} is not a function`)
    return null
  }

  const slotFn = slots[slot]
  if ( !slotFn ) return null

  const params = { ...data }
  return slotFn(params)
}

/**
 * 
 * @param slots 插槽
 * @param excludeKeys 不渲染的key
 * @returns 
 */
export function extendSlots(slots: Slots, excludeKeys: string[] = []) {
  const slotKeys = Object.keys(slots)
  let ret: any = {}

  slotKeys.map(key => {
    if (  excludeKeys.includes(key) ) {
      return null
    }

    ret[key] = (data?: any) => getSlot(slots, key, data)
  })
  return ret
}
