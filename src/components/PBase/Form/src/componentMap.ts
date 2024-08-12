/*
 * @Date: 2024-06-11 15:15:06
 * @LastEditors: phil_litian
 */
import { Component } from 'vue'
import { Select, Input } from 'ant-design-vue'
import { ComponentType } from './types/index'
import { BasicUpload } from '@c/PBase/Upload/index'

export const ComponentMap = new Map<ComponentType | string, Component>();

ComponentMap.set('Input', Input)
ComponentMap.set('Select', Select)
ComponentMap.set('Upload', BasicUpload)
