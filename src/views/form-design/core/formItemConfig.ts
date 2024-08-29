import { Component } from "vue";
import { ComponentMap as PhilCmp, add } from '@c/PBase/Form/src/componentMap'
import { componentMap as Cmp } from '../components/index'
import { IVFormComponent } from "../typings/v-form-component";


const componentMap = new Map<string, Component>()

PhilCmp.forEach((value, key)=>{
  componentMap.set(key, value)
})

Cmp.forEach((value, key)=>{
  componentMap.set(key, value)
  // 如果Cmp中有，但是PhilComp中没有的组件, 则添加到PhilComp中 共享组件
  if ( !PhilCmp.has(key) ) {
    add(key, value)
  }
})

export { componentMap }

// 表单和控件设置
// 栅格布局

// 左侧控件列表
const baseComponent: IVFormComponent[] = [
  {
    component: 'InputCountDown',
    label: '倒计时输入',
    icon: 'line-md:iconify2',
    field: '',
    componentProps: {},
    colProps: {}
  },
  {
    component: 'PIconPicker',
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
    componentProps: {},
    colProps: {}
  },
  {
    component: 'AutoComplete',
    label: '自动完成',
    icon: 'wpf:password1',
    colProps: {},
    componentProps: {
      placeholder: '请输入正则表达式',
      options: [
        { label: '手机号码', value: '/^(?:(?:\\+|00)86)?1[3-9]\\d{9}$/' },
        { label: '网址带端口号', value: '/^((ht|f)tps?:\\/\\/)?[\\w-]+(\\.[\\w-]+)+:\\d{1,5}\\/?$/' },
      ]
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
    colProps: {},
    componentProps: {}
  },
  {
    component: "CheckboxGroup",
    label: '复选框组',
    icon: 'ant-design:check-circle-filled',
    field: '',
    colProps: {},
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
    componentProps: {},
    colProps: {}
  },
  {
    component: "InputNumber",
    label: "数字输入框",
    icon: "ant-design:field-number-outlined",
    field: '',
    componentProps: {
      style: { width: '200px' }
    },
    colProps: { span: 24 }
  },
  {
    component: 'InputTextArea',
    label: '文本域',
    icon: 'ant-design:file-text-filled',
    field: '',
    componentProps: {},
    colProps: {}
  },
  {
    component: 'Select',
    label: '下拉选择',
    icon: 'gg:select',
    field: '',
    colProps: {},
    componentProps: {
      options: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ]
    }
  },
  {
    component: "Radio",
    label: '单选框',
    icon: 'ri:radio-button-line',
    field: '',
    componentProps: {},
    colProps: {}
  },
  {
    component: 'RadioGroup',
    label: '单选框组',
    icon: 'carbon:radio-button-checked',
    field: '',
    colProps: {},
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
    componentProps: {
      placeholder: '请选择日期'
    },
    colProps: {}
  },
  {
    component: 'RangePicker',
    label: '日期范围',
    icon: 'healthicons:i-schedule-school-date-time-outline',
    componentProps: {
      placeholder: ['开始日期', '结束日期']
    },
    colProps: {}
  },
  {
    component: 'MonthPicker',
    label: '月份选择',
    icon: 'healthicons:i-schedule-school-date-time-outline',
    componentProps: {
      placeholder: '请选择月份'
    },
    colProps: {}
  },
  {
    component: 'TimePicker',
    label: '时间选择',
    field: '',
    icon: 'healthicons:i-schedule-school-date-time-outline',
    componentProps: {},
    colProps: {}
  },
  {
    component: 'Slider',
    label: '滑动输入条',
    icon: 'vaadin:slide',
    field: '',
    componentProps: {},
    colProps: {}
  },
  {
    component: 'Rate',
    label: '评分',
    icon: 'ic:outline-star-rate',
    field: '',
    componentProps: {},
    colProps: {}
  },
  {
    component: "Switch",
    label: '开关',
    icon: 'entypo:switch',
    field: '',
    componentProps: {},
    colProps: {}
  },
  {
    component: 'TreeSelect',
    label: '树形选择',
    icon: 'clarity:tree-view-line',
    field: '',
    colProps: {},
    componentProps: {
      treeData: [
        {
          label: '选项一',
          value: 1,
          children: [
            {
              label: '选项三',
              value: 3
            }
          ]
        },
        {
          label: '选项二',
          value: 2
        }
      ]
    }
  },
  {
    component: 'Upload',
    label: '上传',
    icon: 'ant-design:upload-outlined',
    field: '',
    colProps: {},
    componentProps: {}
  },
  {
    label: '级联选择',
    field: '',
    component: 'Cascader',
    icon: 'ant-design:check-outlined',
    colProps: {},
    componentProps: {
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
           },
          ]
        }
      ]
    }
  },
  {
    label: '插槽',
    field: '',
    component: 'slot',
    icon: 'vs:timeslot-question'
  },
  {
    label: '穿梭框',
    component: 'Transfer',
    icon: 'bx:bx-transfer-alt',
    field: '',
    colProps: {},
    componentProps: {
      render: item => item.label,
      dataSource: [
        {
          key: 'a',
          label: 'content-a',
          disabled: false,
        },
        {
          key: 'b',
          label: 'content-b',
          disabled: true,
        },
        {
          key: 'c',
          label: 'content-c',
          disabled: false,
        },
        {
          key: 'd',
          label: 'content-d',
          disabled: false,
        }
      ]
    }
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
    columns: [
      {
        span: 12,
        children: []
      },
      {
        span: 12,
        children: []
      }
    ]
  }
]
