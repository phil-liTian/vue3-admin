/*
 * @Date: 2024-06-11 10:43:45
 * @LastEditors: phil_litian
 */
import { RowProps } from "ant-design-vue";
import { PropType } from "vue";
import { ButtonProps, FormSchema } from "./types/form";
import { propTypes } from "@/utils/propTypes";
import { ColEx } from "./types";


export const basicProps = {
  labelWidth: {
    type: [Number, String],
    default: 0
  },
  // 表单配置规则
  schemas: {
    type: Array as PropType<FormSchema[]>,
    default: () => []
  },
  rowProps: {
    type: Object as PropType<RowProps>,
    default: () => ({})
  },
  size: propTypes.oneOf(['default', 'small', 'large']).def('default'),
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 是否只读
  readonly: {
    type: Boolean,
    default: false
  },
  compact: {
    type: Boolean,
    default: false
  },
  actionColOptions: {
    type: Object as PropType<Partial<ColEx>>,
    default: () => ({})
  },
  showActionButtonGroup: propTypes.bool.def(true),
  showResetButton: propTypes.bool.def(true),
  showSubmitButton: propTypes.bool.def(true),
  submitButtonOptions: {
    type: Object as PropType<Partial<ButtonProps>>
  },
  resetButtonOptions: {
    type: Object as PropType<Partial<ButtonProps>>
  }
}
