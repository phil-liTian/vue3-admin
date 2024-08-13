/*
 * @Date: 2024-06-11 15:15:06
 * @LastEditors: phil_litian
 */
import { Component } from 'vue'
import { 
  Select, 
  Input, 
  DatePicker, 
  Checkbox, 
  CheckboxGroup, 
  RadioGroup, 
  Switch,
  Cascader
} from 'ant-design-vue'
import { ComponentType } from './types/index'
import { BasicUpload } from '@c/PBase/Upload/index'
import RadioButtonGroup from './components/RadioButtonGroup.vue'
import { PBasicTitle } from '@c/Basic/index'

export const ComponentMap = new Map<ComponentType | string, Component>();

// ant
ComponentMap.set('Input', Input)
ComponentMap.set('Select', Select)
ComponentMap.set('DatePicker', DatePicker)
ComponentMap.set('Checkbox', Checkbox);
ComponentMap.set('CheckboxGroup', CheckboxGroup)
ComponentMap.set('RadioGroup', RadioGroup)
ComponentMap.set('Switch', Switch)
ComponentMap.set('Cascader', Cascader)

// custom
ComponentMap.set('Upload', BasicUpload)
ComponentMap.set('RadioButtonGroup', RadioButtonGroup)
ComponentMap.set('BasicTitle', PBasicTitle)
