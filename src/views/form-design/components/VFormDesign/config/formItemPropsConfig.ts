import { IAnyObject } from "@/views/form-design/typings/base-type";
import { Component } from "vue";

export interface IBaseFormAttrs {
  name: string; // 字段名
  label: string; // 字段标签
  component?: string | Component; // 组件
  componentProps?: IAnyObject;
  category?: string; // 组件类型
  includes?: String[]; // 包含的组件
  excludes?: String[]; // 排除的组件
}

// 设置表格栅格属性
export const baseItemColumnProps = [
  {
    name: '',
    label: '栅格数',
    component: 'Slider',
    componentProps: {
      min: 0,
      max: 24,
      mark: { 12: '' }
    }
  }
]

// 控制属性面板的配置项

