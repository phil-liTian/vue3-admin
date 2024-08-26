/**
 * 当前组件属性设置
 */

import { IBaseFormAttrs } from "./formItemPropsConfig"

export const baseComponentControlAttrs: IBaseFormAttrs[] = [
  {
    // 没有disabled属性的控件不能作为form控件
    label: '禁用',
    name: 'disabled'
  },
  {
    label: '自动获取焦点',
    name: 'autoFocus',
    includes: [
      'Input'
    ]
  },
  {
    name: 'allowClear',
    label: '可清除',
    includes: [
      'Input'
    ]
  },
  {
    label: '是否有边框',
    name: 'bordered',
    includes: [ 'Input' ]
  }
]
  
/**
 * 通用组件属性
 */
export const baseComponentCommonAttrs: IBaseFormAttrs[] = [
  {
    label: '尺寸',
    name: 'size',
    component: 'RadioGroup',
    componentProps: {
      options: [
        { label: '大', value: 'large' },
        { label: '中', value: 'middle' },
        { label: '小', value: 'small' }
      ]
    }
  },
  {
    label: '占位符',
    name: 'placeholder',
    componentProps: {
      placeholder: '请输入占位符'
    },
    includes: [ 'Input' ]
  }
]
