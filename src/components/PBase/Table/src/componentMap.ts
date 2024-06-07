/*
 * @Date: 2024-06-04 17:44:39
 * @LastEditors: phil_litian
 */
import { Component } from 'vue'
import { Input, InputNumber, Select, DatePicker, TimePicker, Checkbox, Radio } from 'ant-design-vue'
import { ComponentType } from './types/componentType'

const componentMap = new Map<ComponentType, Component>()

componentMap.set('Input', Input)
componentMap.set('InputNumber', InputNumber)
componentMap.set('Select', Select)
componentMap.set('TimePicker', TimePicker)
componentMap.set('DatePicker', DatePicker)
componentMap.set('Checkbox', Checkbox)
componentMap.set('Radio', Radio)
componentMap.set('RadioGroup', Radio.Group)


export { componentMap }
