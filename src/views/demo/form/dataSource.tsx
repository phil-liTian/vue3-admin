import { h } from 'vue'
import { Input, FormItem, FormItemRest, Select } from 'ant-design-vue'
import { FormSchema } from '@/components/PBase/Form';


export const schemas: FormSchema[] = [
  {
    field: 'divider-basic',
    component: 'Divider',
    label: '基础字段',
    colProps: {
      span: 24
    }
  },
  {
    field: 'field1',
    component: 'Input',
    defaultValue: "123",
    label: () => {
      return `字段1`
    },
    colProps: {
      span: 8
    },
    componentProps: () => {
      return {
        placeholder: '自定义placeholder',
        onChange: (e: any) => {
          console.log('e--->', e);
        }
      }
    },

    renderComponentContent: () => {
      return {
        prefix: () => 'prefix',
        suffix: () => 'suffix'
      }
    }
  },
  {
    field: 'field2',
    component: 'Input',
    label: '带后缀',
    defaultValue: '111',
    suffix: '天',
    colProps: {
      span: 8
    }
  },
  {
    field: 'fieldSc',
    component: 'Upload',
    label: '上传',
    colProps: {
      span: 8
    }
  },
  {
    field: 'field3',
    label: '字段3',
    component: "DatePicker",
    colProps: {
      span: 8
    }
  },
  {
    field: 'field4',
    label: '字段4',
    component: 'Select',
    colProps: {
      span: 8
    },
    componentProps: {
      options: [
        { value: '1', label: '选项1', key: '1' },
        { value: '2', label: '选项2', key: '2' }
      ]
    }
  },
  {
    field: 'field5',
    label: '字段5',
    component: 'CheckboxGroup',
    colProps: {
      span: 8
    },
    componentProps: {
      options: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ]
    }
  },
  {
    field: 'field6',
    label: '字段6',
    component: 'RadioGroup',
    colProps: {
      span: 8
    },
    componentProps: {
      options: [
        { label: '选项一', value: '1' },
        { label: '选项二', value: '2' },
      ]
    }
  },
  {
    field: 'field7',
    label: '字段7',
    component: 'Switch',
    colProps: {
      span: 8
    }
  },
  {
    field: 'field8',
    label: '字段8',
    component: 'Checkbox',
    colProps: {
      span: 8
    }
  },
  {
    field: 'field9',
    label: '字段9',
    component: 'Cascader',
    colProps: {
      span: 8
    },
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
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ]
    }
  },
  {
    field: 'field10',
    label: '字段10',
    component: 'RadioButtonGroup',
    colProps: {
      span: 8
    }
  },
  {
    field: 'field11',
    label: '标题区分',
    component: 'BasicTitle',
    componentProps: {
      span: true,
      // line: true
    },
    colProps: {
      span: 24
    }
  }
]

export const refSchemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 8
    },
    componentProps: {
      placeholder: '自定义placeholder'
    }
  },
  {
    field: 'field2',
    label: '字段2',
    component: 'Input',
    colProps: {
      span: 8
    },
    componentProps: {

    }
  },
  {
    field: 'field3',
    component: 'DatePicker',
    label: '字段3',
    colProps: {
      span: 8
    },
  },
  {
    field: 'field4',
    component: 'Select',
    label: '字段4',
    colProps: {
      span: 8
    },
    componentProps: {
      options: [
        { label: '选项一', value: '1', key: '1' },
        { label: '选项二', value: '2', key: '2' },
      ]
    }
  },
  {
    field: 'field5',
    component: 'CheckboxGroup',
    label: '字段5',
    colProps: {
      span: 8
    },
    componentProps: {
      options: [
        { label: '选项一', value: '1', key: '1' },
        { label: '选项二', value: '2', key: '2' },
      ]
    }
  },
  {
    field: 'field6',
    component: 'RadioGroup',
    label: '字段6',
    colProps: {
      span: 8
    },
    componentProps: {
      options: [
        { label: '选项一', value: '1', key: '1' },
        { label: '选项二', value: '2', key: '2' },
      ]
    }
  }
]

export const useSchemas: FormSchema[] = [
  {
    field: 'field1',
    label: '字段1',
    component: 'Input',
    colProps: {
      span: 8
    }
  }
]

export const settingSchemas: FormSchema[] = [
  {
    field: 'd1',
    component: 'Divider',
    label: '基础属性',
    colProps: {
      span: 24
    },
    componentProps: {
      
    }
  },
  {
    field: 'name',
    defaultValue: 'useForm',
    component: 'Input',
    label: 'name',
    colProps: { span: 24 }
  },
  {
    field: 'labelWidth',
    component: 'InputNumber',
    defaultValue: 120,
    label: 'labelWidth',
    colProps: { span: 24 }
  },
  {
    field: 'colon',
    component: 'Switch',
    defaultValue: false,
    label: 'colon',
    colProps: { span: 24 }
  },
  {
    field: 'disabled',
    component: 'Switch',
    defaultValue: false,
    label: 'disabled',
    colProps: { span: 24 }
  },
  {
    field: 'compact',
    component: 'Switch',
    defaultValue: false,
    label: 'compact',
    colProps: { span: 24 }
  },
  {
    field: 'autoSetPlaceholder',
    component: 'Switch',
    defaultValue: false,
    label: 'autoSetPlaceholder',
    colProps: { span: 24 }
  },
  {
    field: 'showAdvancedButton',
    component: 'Switch',
    defaultValue: false,
    label: 'showAdvancedButton',
    colProps: { span: 24 }
  },
  {
    field: 'd2',
    component: 'Divider',
    label: '网格布局',
    colProps: { span: 24 }
  }
]

export const ruleSchemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    required: true,
    colProps: {
      span: 8
    }
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
    required: true,
    colProps: {
      span: 8
    }
  },
  {
    field: 'id',
    label: 'id',
    defaultValue: 0,
    component: 'InputNumber',
  },
  {
    field: 'field3',
    component: 'DatePicker',
    label: '字段3',
    required: true,
    colProps: {
      span: 8
    }
  },
  {
    field: 'field4',
    label: '字段4',
    component: 'Select',
    componentProps: {
      mode: 'multiple',
      options: [
        { label: '选项一', value: '1', key: '1' },
        { label: '选项二', value: '2', key: '2' },
      ]
    },
    rules: [{ required: true, message: '请输入aa' }],
    colProps: {
      span: 8
    }
  },
  {
    field: 'field5',
    label: '字段5',
    component: 'Input',
    colProps: {
      span: 8
    },
    rules: [
      {
        required: true,
        trigger: 'change',
        validator: (rule, value) => {
          if ( !value ) {
            return Promise.reject('值不能为空!')
          } 
          if ( value === '1' ) {
            return Promise.reject('值不能为1')
          }
          return Promise.resolve()
        }
      }
    ]
  },
  {
    field: 'field6',
    label: '字段6',
    component: 'CheckboxGroup',
    componentProps: {
      options: [
        { label: '选项一', value: '1', key: '1' },
        { label: '选项二', value: '2', key: '2' },
      ]
    },
    rules: [ { required: true, message: '请选择' } ]
  }
]

export const appendSchemas: FormSchema[] = [
  {
    field: 'field0a',
    component: 'Input',
    label: '字段0'
  },
  {
    field: 'field0b',
    component: 'Input',
    label: '字段0'
  },
  {
    field: '0',
    label: '',
    slot: 'add'
  }
]

export const dynamicSchemas: FormSchema[] = [
  {
    field: 'field1',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 8
    }
  },
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
    colProps: {
      span: 8
    }
  },
  {
    field: 'field3',
    component: 'Input',
    label: '字段3',
    colProps: {
      span: 8
    }
  }
]

export const dynamicSchemas1: FormSchema[] = [
  {
    field: 'f1',
    component: 'Input',
    label: '字段1',
    colProps: {
      span: 8
    },
    componentProps: {
      disabled: true
    }
  },
  {
    field: 'f2',
    component: 'Input',
    label: '字段2',
    colProps: {
      span: 8
    },
    componentProps: ({ formModel }) => {
      return {
        placeholder: '同步f2的值为f1',
        onChange(e) {
          formModel.f1 = e.target.value
        }
      }
    }
  },
  {
    field: 'f3',
    component: 'Input',
    label: '字段3',
    colProps: {
      span: 8
    },
    componentProps: ({ formActionType }) => {
      return {
        placeholder: '值改变时执行查询逻辑',
        onChange: async () => {
          console.log('formActionType', formActionType);
          const { validateFields } = formActionType
          const res = await validateFields()
          console.log('e--->', res);
        }
      }
    }
  }
]

export const customerSchemas: FormSchema[] = [
  {
    field: 'f1',
    component: 'Input',
    label: 'render方式',
    colProps: {
      span: 8
    },
    required: true,
    dynamicDisabled: ({ model, field, values }) => {
      return !!model['field_disabled']
    },
    render: ({ model, field }, { disabled }) => {
      return h(Input, {
        placeholder: '请输入f1',
        value: model[field],
        onChange: (e: any) => {
          model[field] = e.target.value
        },
        disabled
      })
    }
  },
  {
    field: 'f2',
    label: 'render组件slot',
    component: 'Input',
    colProps: {
      span: 8
    },
    required: true,
    dynamicDisabled: ({ model }) => {
      return !!model['field_disabled']
    },
    renderComponentContent: (_, { disabled }) => {
      return {
        suffix: () => disabled ? 'disabled_suffix' : 'default_suffix'
      }
    }
  },
  {
    field: 'f3',
    slot: 'f3',
    label: '自定义slot',
    colProps: {
      span: 8
    },
    required: true,
    dynamicDisabled: ({ model }) => {
      return !!model['field_disabled']
    },
  },
  {
    field: 'f4',
    component: 'Input',
    colProps: {
      span: 8
    },
    required: true,
    dynamicDisabled: ({ model }) => {
      return !!model['field_disabled']
    },
    renderColContent: ({ model, field }, { disabled }) => {
      return <FormItem name='field4' label='renderColContent渲染' rules={[{ required: true }]}>
        <Input v-model={model[field]} disabled={disabled}></Input>
      </FormItem>
    }
  },
  {
    field: 'f5',
    label: '自定义colSlot',
    colProps: {
      span: 8
    },
    required: true,
    colSlot: 'field5_colSlot',
    dynamicDisabled: ({ model }) => {
      return !!model['field_disabled']
    },
  },
  // TODO: 复合render
  {
    field: 'typeKey2',
    label: '复合field render',
    colProps: {
      span: 8
    },
    dynamicDisabled: ({ model }) => {
      return !!model['field_disabled']
    },
    render({ model, field }, { disabled }) {
      return (
        <Input.Group compact>
          <Select style="width: 120px" allowClear disabled={disabled} v-model={model[field]}>
            <Select.Option value='类型'>类型</Select.Option>
            <Select.Option value='名称'>名称</Select.Option>
          </Select>
          <FormItem name='typeValue2' rules={ [{ required: true, message: '请输入名称' }] }>
            <FormItemRest>
              <Input 
                placeholder='请输入'
                disabled={disabled} 
                v-model={model.typeValue2} />
            </FormItemRest>
          </FormItem>
        </Input.Group>
      )
    }
  },
  // TODO: 复合renderColContent
  {
    field: 'typeKey',
    colProps: {
      span: 16
    },
    dynamicDisabled: ({ model }) => {
      return !!model['field_disabled']
    },
    renderColContent({ model, field }, { disabled }) {
      return <FormItem label='复合field renderColContent'>
        <Input.Group compact>
          <Select 
            style="width: 120px" 
            allowClear
            disabled={disabled} 
            v-model={model[field]}>
            <Select.Option value='类型'>类型</Select.Option>
            <Select.Option value='名称'>名称</Select.Option>
          </Select>

          <FormItemRest>
            <Input 
              style="width: calc(100% - 120px)"
              placeholder='请输入'
              disabled={disabled} 
              v-model={model.typeValue} />
          </FormItemRest>
        </Input.Group>
      </FormItem>
    }
  },
  {
    field: 'field_disabled',
    component: 'Switch',
    label: '是否禁用 编辑字段',
    colProps: {
      span: 8
    }
  }
]
