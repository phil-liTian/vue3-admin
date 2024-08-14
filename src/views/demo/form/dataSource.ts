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
  }
]

export const dynamicSchemas1: FormSchema[] = [
  {
    field: 'field1',
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
    field: 'field2',
    component: 'Input',
    label: '字段2',
    colProps: {
      span: 8
    }
  }
]

export const customerSchemas: FormSchema[] = [
  {
    field: 'field2',
    component: 'Input',
    label: '字段2',
    colProps: {
      span: 8
    }
  },
]
