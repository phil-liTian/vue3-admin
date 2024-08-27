import { Component } from "vue";
import { Slider, Select, Input, RadioGroup } from 'ant-design-vue'
import { IAnyObject } from "@/views/form-design/typings/base-type";
import baseComponent from '../../../core/formItemConfig'

export interface IBaseFormAttrs {
  name: string; // 字段名
  label: string; // 字段标签
  component?: string | Component; // 组件
  componentProps?: IAnyObject;
  category?: string; // 组件类型
  includes?: String[]; // 包含的组件
  excludes?: String[]; // 排除的组件
}

export const globalConfigState: { span: number } = {
  span: 24
}

export interface IBaseFormItemControlAttrs extends IBaseFormAttrs {
  target?: 'props' | 'options'; // 绑定到对象下的某个目标key中
}

// 设置表格栅格属性
export const baseItemColumnProps: IBaseFormAttrs[] = [
  {
    name: 'span',
    label: '栅格数',
    component: Slider,
    componentProps: {
      min: 0,
      max: 24,
      mark: { 12: '' }
    }
  },
  {
    name: 'offset',
    label: '栅格左侧的间隔格数',
    component: Slider,
    componentProps: {
      min: 0,
      max: 24,
      mark: { 12: '' }
    }
  },
  {
    name: 'order',
    component: Slider,
    label: '栅格顺序，在flex布局下生效',
    componentProps: {
      min: 0,
      max: 24,
      mark: { 12: '' }
    }
  },
  {
    name: 'pull',
    label: '栅格向左移动格数',
    component: Slider,
    componentProps: {
      min: 0,
      max: 24,
      mark: { 12: '' }
    }
  },
  {
    name: 'push',
    label: '栅格向右移动格数',
    component: Slider,
    componentProps: {
      min: 0,
      max: 24,
      mark: { 12: '' }
    }
  },
  {
    name: 'xs',
    label: '<576px 响应式栅格',
    component: Slider,
    componentProps: {
      min: 0,
      max: 24,
      mark: { 12: '' }
    }
  },
  {
    name: 'sm',
    label: '≥576px 响应式栅格',
    component: Slider,
    componentProps: {
      min: 0,
      max: 24,
      mark: { 12: '' }
    }
  },
  {
    name: 'md',
    label: '≥768px 响应式栅格',
    component: Slider,
    componentProps: {
      min: 0,
      max: 24,
      mark: { 12: '' }
    }
  },
  {
    name: 'lg',
    label: '≥992px 响应式栅格',
    component: Slider,
    componentProps: {
      min: 0,
      max: 24,
      mark: { 12: '' }
    }
  },
  {
    name: 'xl',
    label: '≥1200px 响应式栅格',
    component: Slider,
    componentProps: {
      min: 0,
      max: 24,
      mark: { 12: '' }
    }
  },
  {
    name: 'xxl',
    label: '≥1600px 响应式栅格',
    component: Slider,
    componentProps: {
      min: 0,
      max: 24,
      mark: { 12: '' }
    }
  },
]

// 控制属性面板的基础配置项
export const baseFormItemProps: IBaseFormAttrs[] = [
  {
    name: 'component',
    label: '控件-formItem',
    component: Select,
    componentProps: {
      options: baseComponent.map(item => ({ label: item.label, value: item.component }))
    }
  },
  {
    name: 'label',
    label: '标签',
    component: Input,
    componentProps: {
      placeholder: '请输入标签',
    }
  },
  {
    name: 'field',
    label: '字段标识',
    component: Input,
    componentProps: {
      placeholder: '请输入字段标识',
    }
  },
  {
    name: 'helpMessage',
    label: 'helpMessage',
    component: Input,
    componentProps: {
      placeholder: '请输入提示信息',
    }
  }
]

// 控制属性面板的高级选项
export const advanceFormItemProps: IBaseFormAttrs[] = [
  {
    name: 'labelAlign',
    label: '标签对齐方式',
    component: RadioGroup,
    componentProps: {
      options: [
        { label: '左对齐', value: 'left' },
        { label: '右对齐', value: 'right' },
      ]
    }
  },
  {
    name: 'help',
    label: 'help',
    component: Input,
    componentProps: {
      placeholder: '请输入提示信息',
    }
  },
  {
    name: 'extra',
    label: '额外信息',
    component: Input,
    componentProps: {
      placeholder: '请输入额外信息',
    }
  },
  {
    name: 'validateTrigger',
    label: 'validateTrigger',
    component: Input,
    componentProps: {
      placeholder: '请输入validateTrigger',
    }
  },
  {
    name: 'validateStatus',
    label: '核验状态',
    component: RadioGroup,
    componentProps: {
      options: [
        { label: '默认', value: '' },
        { label: '成功', value: 'success' },
        { label: '警告', value: 'warning' },
        { label: '错误', value: 'error' },
        { label: '核验中', value: 'validating' },
      ]
    }
  }
]

// 控件栅格布局属性
export const advanceFormItemColProps: IBaseFormAttrs[] = [
  {
    name: 'labelCol',
    label: '标签-col',
    component: Slider,
    componentProps: {
      min: 0,
      max: 24,
      mark: { 12: '' }
    }
  },
  {
    name: 'wrapperCol',
    label: '内容-col',
    component: Slider,
    componentProps: {
      min: 0,
      max: 24,
      mark: { 12: '' }
    }
  }
]

// 控制属性
export const baseFormItemControlAttrs: IBaseFormItemControlAttrs[] = [
  {
    label: '是否必填',
    name: 'required',
  },
  {
    label: '是否隐藏',
    name: 'hidden',
  },
  {
    label: '是否隐藏标签',
    name: 'hideLabel',
  },
  {
    label: 'label后面显示冒号',
    name: 'colon'
  },
  {
    label: '输入反馈',
    name: 'hasFeedback'
  },
  {
    label: '自动关联',
    name: 'autoLink'
  },
  {
    label: '验证错误停止',
    name: 'validateFirst'
  }
]

