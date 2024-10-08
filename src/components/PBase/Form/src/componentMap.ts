/*
 * @Date: 2024-06-11 15:15:06
 * @LastEditors: phil_litian
 */
import { Component } from 'vue'
import { 
  Select, 
  Input, 
  InputNumber,
  DatePicker, 
  TimePicker,
  Checkbox, 
  CheckboxGroup, 
  RadioGroup, 
  Switch,
  Cascader,
  Slider,
  Divider
} from 'ant-design-vue'
import { ComponentType } from './types/index'
import { PBasicUpload } from '@c/PBase/Upload/index'
import RadioButtonGroup from './components/RadioButtonGroup.vue'
import ApiSelect from './components/ApiSelect.vue'
import ApiCascader from './components/ApiCascader.vue'
import ApiTree from './components/ApiTree.vue'
import ApiRadioGroup from './components/ApiRadioGroup.vue'
import ApiTreeSelect from './components/ApiTreeSelect.vue'
import ApiTransfer from './components/ApiTransfer.vue'
import { PBasicTitle } from '@c/Basic/index'
import { InputCountDown } from '@c/CountDown/index'
import { StrengthMeter } from '@c/StrengthMeter/index'
import { PIconPicker } from '@c/Icon/index'

export const ComponentMap = new Map<ComponentType | string, Component>();

// ant
ComponentMap.set('Input', Input)
ComponentMap.set('InputTextArea', Input.TextArea)
ComponentMap.set('Select', Select)
ComponentMap.set('DatePicker', DatePicker)
ComponentMap.set('RangePicker', DatePicker.RangePicker)
ComponentMap.set('TimeRangePicker', TimePicker.TimeRangePicker)

ComponentMap.set('Checkbox', Checkbox);
ComponentMap.set('CheckboxGroup', CheckboxGroup)
ComponentMap.set('RadioGroup', RadioGroup)
ComponentMap.set('Switch', Switch)
ComponentMap.set('Cascader', Cascader)
ComponentMap.set('InputNumber', InputNumber)
ComponentMap.set('Slider', Slider)
ComponentMap.set('Divider', Divider)

// custom
ComponentMap.set('Upload', PBasicUpload)
ComponentMap.set('RadioButtonGroup', RadioButtonGroup)
ComponentMap.set('BasicTitle', PBasicTitle)
ComponentMap.set('InputCountDown', InputCountDown)
ComponentMap.set('ApiSelect', ApiSelect)
ComponentMap.set('ApiCascader', ApiCascader)
ComponentMap.set('ApiTree', ApiTree)
ComponentMap.set('ApiRadioGroup', ApiRadioGroup)
ComponentMap.set('ApiTreeSelect', ApiTreeSelect)
ComponentMap.set('ApiTransfer', ApiTransfer)
ComponentMap.set('StrengthMeter', StrengthMeter)
ComponentMap.set('PIconPicker', PIconPicker)

export function add<T extends string>(compName, component) {
  ComponentMap.set(compName, component)
}

