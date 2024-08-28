/**
 * 当前组件属性设置
 */
import { Input, RadioGroup } from 'ant-design-vue'
import { IBaseFormAttrs } from "./formItemPropsConfig"

interface IBaseComponentProps {
  [key: string]: IBaseFormAttrs[]
}

// 控制boolean类型的值
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
      'Input',
      'Select'
    ]
  },
  { name: 'fullscreen', label: '全屏', includes: [ 'Calendar' ] },
  {
    name: 'multiple',
    label: '是否可多选',
    includes: [ 'Select' ]
  },
  {
    label: '是否有边框',
    name: 'bordered',
    includes: [ 'Input' ]
  },
  { label: '允许半选', name: 'allowHalf', includes: [ 'Rate' ] },
  {
    label: '高亮第一个选项',
    name: 'defaultActiveFirstOption',
    includes: [ 'Select', 'AutoComplete' ]
  },
  {
    label: '下拉菜单和选择器同宽',
    name: 'dropdownMatchSelectWidth',
    includes: [ 'Select', 'AutoComplete', 'TreeSelect' ]
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
    },
    includes: [ 'Input', 'InputNumber' ]
  },
  {
    label: '占位符',
    name: 'placeholder',
    component: Input,
    componentProps: {
      placeholder: '请输入占位符'
    },
    includes: [ 'Input', 'InputTextArea' ]
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
    includes: [ 'Select', 'AutoComplete' ]
  }
]

const componentAttrs: IBaseComponentProps = {
  Input: [
    {
      name: 'type',
      label: '类型',
      component: 'Select',
      componentProps: {
        options: [
          { label: '文本', value: 'text' },
          { label: '按钮', value: 'button' },
          { label: '复选框', value: 'checkbox' },
          { label: '颜色', value: 'color' },
          { label: '日期', value: 'date' },
          { label: '日期-无时区', value: 'datetime-local' },
          { label: '邮箱', value: 'email' },
          { label: '文件', value: 'file' },
        ]
      }
    },
    {
      name: 'defaultValue',
      label: '默认值',
      component: 'Input',
      componentProps: {
        placeholder: '请输入默认值'
      }
    },
    {
      name: 'prefix',
      label: '前缀',
      component: 'Input',
      componentProps: {
        placeholder: '请输入前缀'
      }
    },
    {
      name: 'suffix',
      label: '后缀',
      component: 'Input',
      componentProps: {
        placeholder: '请输入后缀'
      }
    },
    {
      name: 'addonBefore',
      label: '前置标签',
      component: 'Input',
      componentProps: {
        placeholder: '请输入前置标签'
      }
    },
    {
      name: 'addonAfter',
      label: '后置标签',
      component: 'Input',
      componentProps: {
        placeholder: '请输入后置标签'
      }
    },
    {
      name: 'maxLength',
      label: '最大长度',
      component: 'InputNumber',
      componentProps: {
        placeholder: '请输入最大长度'
      }
    }
  ],

  AutoComplete: [
    {
      name: 'defaultOpen',
      label: '是否默认打开下拉菜单',
      component: 'Checkbox'
    },
    {
      name: 'backfill',
      label: '是否自动回填',
      component: 'Switch',
      componentProps: {
        span: 8
      }
    }
  ],

  IconPicker: [
    {
      label: '模式',
      name: 'mode',
      component: 'RadioGroup',
      componentProps: {
        options: [
          { label: 'ICONIFY', value: null },
          { label: 'SVG', value: 'svg' },
        ]
      }
    }
  ],

  // TODO: others
}

export const baseComponentAttrs: IBaseComponentProps = componentAttrs
