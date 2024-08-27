/**
 * 当前组件属性设置
 */
import { Input, RadioGroup } from 'ant-design-vue'
import { IBaseFormAttrs } from "./formItemPropsConfig"

interface IBaseComponentProps {
  [key: string]: IBaseFormAttrs[]
}

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
    component: RadioGroup,
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
    component: Input,
    componentProps: {
      placeholder: '请输入占位符'
    },
    includes: [ 'Input' ]
  },
  {
    label: '样式',
    name: 'style',
    component: Input,
    componentProps: {
      placeholder: '请输入样式'
    }
  },
  {
    name: 'open',
    label: '一直展开下拉菜单',
    component: RadioGroup,
    componentProps: {
      options: [
        { label: '默认', value: undefined },
        { label: '是', value: true },
        { label: '否', value: false }
      ]
    },
    includes: [ 'Select' ]
  }
]

const componentAttrs: IBaseComponentProps = {
  Input: [
    {
      name: 'defaultValue',
      label: '默认值',
      component: Input,
      componentProps: {
        placeholder: '请输入默认值'
      }
    }
  ]
}

export const baseComponentAttrs: IBaseComponentProps = componentAttrs
