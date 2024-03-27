/*
 * @Date: 2024-03-27 14:35:56
 * @LastEditors: phil_litian
 */

// 用于监控路由变化，以改变菜单和选项卡的状态。无需监控路由，因为路由状态的变化受页面渲染时间的影响，而页面渲染时间会很慢 

import mitt from "@/utils/mitt";
const key = Symbol()
const emitter = mitt()
let lastChangeTab = ''
// 
export function setRouteChange(lastChangeRoute) {
  emitter.emit(key, lastChangeRoute)
  
  lastChangeTab = lastChangeRoute
}

export function listenerRouteChange(cb, immediate = true) {
  emitter.on(key, cb)
  immediate && cb(lastChangeTab)
}
