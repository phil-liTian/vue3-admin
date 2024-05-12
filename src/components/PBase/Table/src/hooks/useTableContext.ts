/*
 * @Date: 2024-05-08 10:22:05
 * @LastEditors: phil_litian
 */
/**
 * 处理table全局上下文
 */
import { ComputedRef, Ref, inject, provide } from "vue"
import { TableActionType } from "../types/table"

const key = Symbol('basic-table')

type Instance = TableActionType & {
  getBindValues: ComputedRef<Recordable>, // 在后代组件中需要使用到Basictable中的属性
  wrapRef: Ref<Nullable<HTMLElement>> // 用来指定ToolTip弹出框的位置与wrapRef进行关联
}

type RetInstance = Instance 

export function createTableContext(instance: Instance) {
  provide(key, instance)
}

export function useTableContext(): RetInstance {
  return inject(key) as RetInstance
}
