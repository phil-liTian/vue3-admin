import { Component } from "vue";
import { ComponentMap as PhilCmp, add } from '@c/PBase/Form/src/componentMap'
import { IVFormComponent } from "../typings/v-form-component";


const componentMap = new Map<string, Component>()

PhilCmp.forEach((value, key)=>{
  componentMap.set(key, value)
})

export { componentMap }



// 左侧控件列表
const baseComponent: IVFormComponent[] = [
  {
    component: 'InputCountDown',
    label: '倒计时输入',
    icon: 'line-md:iconify2',
    field: '',
    componentProps: {}
  },
  {
    component: 'IconPicker',
    label: '图标选择器',
    icon: 'line-md:iconify2',
    colProps: { span: 24 },
    field: '',
    componentProps: {},
  },
  {
    component: "StrengthMeter",
    label: "密码强度",
    icon: 'wpf:password1',
    field: '',
    componentProps: {}
  },
  {
    component: 'AutoComplete',
    label: '自动完成',
    icon: 'wpf:password1',
    componentProps: {
      placeholder: '请输入正则表达式',
    }
  },
  {
    component: "Divider",
    label: '分割线',
    icon: 'radix-icons:divider-horizontal',
    colProps: { span: 24 },
    field: '',
    componentProps: {}
  },
  {
    component: "Checkbox",
    label: '复选框',
    icon: 'mdi:checkbox-outline',
    field: '',
    componentProps: {}
  },
  {
    component: "CheckboxGroup",
    label: '复选框组',
    icon: 'ant-design:check-circle-filled',
    field: '',
    componentProps: {
      options: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ]
    }
  },
  {
    component: "Input",
    label: '输入框',
    icon: 'bi:input-cursor-text',
    field: '',
    componentProps: {}
  },
  {
    component: "InputNumber",
    label: "数字输入框",
    icon: "ant-design:field-number-outlined",
    field: '',
    componentProps: {}
  },
  {
    component: 'InputTextArea',
    label: '文本域',
    icon: 'ant-design:file-text-filled',
    field: '',
    componentProps: {}
  },
  {
    component: 'Select',
    label: '下拉选择',
    icon: 'gg:select',
    field: '',
    componentProps: {}
  },
  {
    component: "Radio",
    label: '单选框',
    icon: 'ri:radio-button-line',
    field: '',
    componentProps: {}
  },
  {
    component: 'RadioGroup',
    label: '单选框组',
    icon: 'carbon:radio-button-checked',
    field: '',
    componentProps: {
      options: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ]
    }
  }, 
  {
    component: 'DatePicker',
    label: '日期选择',
    icon: 'healthicons:i-schedule-school-date-time-outline',
    componentProps: {}
  },
  {
    component: 'RangePicker',
    label: '日期范围',
    icon: 'healthicons:i-schedule-school-date-time-outline',
    componentProps: {}
  },
  {
    component: 'MonthPicker',
    label: '月份选择',
    icon: 'healthicons:i-schedule-school-date-time-outline',
    componentProps: {}
  },
  {
    component: 'TimePicker',
    label: '时间选择',
    field: '',
    icon: 'healthicons:i-schedule-school-date-time-outline',
    componentProps: {}
  },
  {
    component: 'Slider',
    label: '滑动输入条',
    icon: 'vaadin:slide',
    field: '',
    componentProps: {}
  },
  {
    component: 'Rate',
    label: '评分',
    icon: 'ic:outline-star-rate',
    field: '',
    componentProps: {}
  },
  {
    component: "Switch",
    label: '开关',
    icon: 'entypo:switch',
    field: '',
    componentProps: {}
  },
  {
    component: 'tree',
    label: '树形选择',
    icon: 'clarity:tree-view-lin',
    field: ''
  },
  {
    component: 'Upload',
    label: '上传',
    icon: 'ant-design:upload-outlined',
    field: '',
  },
  {
    label: '级联选择',
    field: '',
    component: 'Cascader',
    icon: 'ant-design:check-outlined',
  },
  {
    label: '插槽',
    field: '',
    component: 'slot',
    icon: 'vs:timeslot-question'
  },
  {
    label: '穿梭框',
    component: 'transfer',
    icon: 'bx:bx-transfer-alt',
    field: ''
  }
]
export default baseComponent;

// 栅格布局
export const layoutComponents: IVFormComponent[] = [
  {
    component: 'Grid',
    label: '栅格布局',
    icon: 'icon-grid',
    field: '',
    componentProps: {},
    colProps: { span: 24 },
    // columns: [

    // ]
  }
]
