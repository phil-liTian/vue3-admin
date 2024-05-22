/*
 * @Date: 2024-05-14 13:24:09
 * @LastEditors: phil_litian
 */

import { ComputedRef, computed, ref, unref, watch } from "vue";
import { BasicTableProps } from "../types/table";

export function useLoading(propsRef: ComputedRef<BasicTableProps>) {
  
  const loadingRef = ref(unref(propsRef).loading)
  // 使用useTable时 需监听loading变化修改loadingRef
  watch(() => unref(propsRef).loading, (loading) => {
    loadingRef.value = loading
  })

  const getLoading = computed(() => unref(loadingRef))
  
  const setLoading = (loading: boolean) => {
    loadingRef.value = loading
  }

  return {
    getLoading,
    setLoading
  }
}