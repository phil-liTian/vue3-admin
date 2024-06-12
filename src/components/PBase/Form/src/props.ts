/*
 * @Date: 2024-06-11 10:43:45
 * @LastEditors: phil_litian
 */
import { RowProps } from "ant-design-vue";
import { PropType } from "vue";
import { FormSchema } from "./types/form";

export const basicProps = {
  // 表单配置规则
  schemas: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  },

  rowProps: {
    type: Object as PropType<RowProps>,
    default: () => ({})
  }
}
