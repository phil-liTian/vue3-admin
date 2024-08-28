import { Input, DatePicker, Rate, Transfer, Cascader, TreeSelect, TimePicker, AutoComplete } from 'ant-design-vue'
import { Component } from 'vue'

const componentMap = new Map<string, Component>()

componentMap.set('InputTextArea', Input.TextArea)
componentMap.set('MonthPicker', DatePicker.MonthPicker)
componentMap.set('Rate', Rate)
componentMap.set('Transfer', Transfer)
componentMap.set('Cascader', Cascader)
componentMap.set('TreeSelect', TreeSelect)
componentMap.set('TimePicker', TimePicker)
componentMap.set('AutoComplete', AutoComplete)

export { componentMap }
