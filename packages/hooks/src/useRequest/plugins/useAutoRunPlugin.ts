/*
 * @Date: 2024-07-04 21:58:08
 * @LastEditors: phil_litian
 */

import { watch } from "vue"
import { UseRequestPlugin } from "../types"

const useAutoRunPlugin: UseRequestPlugin<any, any[]> = ( 
  fetchInstance,
  { manual, ready = true, defaultParams = [], refreshDeps = [], refreshDepsAction }
) => {

  if ( refreshDeps?.length ) {
    watch(refreshDeps, () => {
      if ( refreshDepsAction ) {
        refreshDepsAction()
      } else {
        fetchInstance.refresh()
      }
    })
  }

  return {
    onBefore: () => {

    }
  }
}

// useAutoRunPlugin.onInit = () => {
  
// }

export default useAutoRunPlugin
