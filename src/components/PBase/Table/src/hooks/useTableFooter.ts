/*
 * @Date: 2024-05-11 10:18:39
 * @LastEditors: phil_litian
 */
import { ComputedRef, computed, h, unref } from "vue";
import TableFooter from '../components/TableFooter.vue'
import { BasicTableProps } from "../types/table";

export function useTableFooter(propsRef: ComputedRef<BasicTableProps>) {
  const getFooterProps = computed(() => {
    const { showSummary, summaryFunc } = unref(propsRef)
    return showSummary ? () => h(TableFooter, { summaryFunc }) : undefined
  })

  return {
    getFooterProps
  }
}
