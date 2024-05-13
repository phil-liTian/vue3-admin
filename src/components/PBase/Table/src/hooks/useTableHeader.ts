/*
 * @Date: 2024-05-07 10:21:57
 * @LastEditors: phil_litian
 */
/**
 * 处理title组件 自定义插槽
 */
import { ComputedRef, Slots, computed, h, unref } from 'vue'
import TableHeader from '../components/TableHeader.vue'
import { getSlot } from '@/utils/helper/tsxHelper'
import { BasicTableProps, InnerMethods } from '../types/table'

export function useTableHeader(slots: Slots, propsRef: ComputedRef<BasicTableProps>, methods: InnerMethods) {
  const getHeaderProps = computed(() => {
    const { showTableSetting, titleHelpMessage, title } = unref(propsRef)
    return {
      title: () => h(TableHeader, 
        {
          title,
          showTableSetting,
          titleHelpMessage,
          count: methods.getSelectRowKeys().length
        }, 
        { 
          ...(slots.toolbar ? { toolbar: () => getSlot(slots, 'toolbar') } : {})
        })
    }
  })

  return { getHeaderProps }
}