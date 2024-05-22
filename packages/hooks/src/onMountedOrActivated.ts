/*
 * @Date: 2024-05-15 19:17:49
 * @LastEditors: phil_litian
 */
import { onMounted, onActivated, nextTick } from 'vue'

export function onMountedOrActivated(hook) {
  let mounted: boolean = false

  onMounted(() => {
    hook()
    nextTick(() => mounted = true)
  })

  onActivated(() => {
    if ( mounted ) hook()
  })
}