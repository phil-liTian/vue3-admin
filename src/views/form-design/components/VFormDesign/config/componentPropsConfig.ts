/**
 * 当前组件属性设置
 */
import { Input, RadioGroup, Select, InputNumber, DatePicker, Cascader } from 'ant-design-vue'
import { IBaseFormAttrs } from "./formItemPropsConfig"
import { placeholder } from '@codemirror/view'

interface IBaseComponentProps {
  [key: string]: IBaseFormAttrs[]
}

// 控制boolean类型的值
export const baseComponentControlAttrs: IBaseFormAttrs[] = [
  {
    // 没有disabled属性的控件不能作为form控件
    label: '禁用',
    name: 'disabled'
  },
  {
    label: '自动获取焦点',
    name: 'autoFocus',
    includes: [
      'Input'
    ]
  },
  {
    name: 'allowClear',
    label: '可清除',
    includes: [
      'Input',
      'Select'
    ]
  },
  { name: 'fullscreen', label: '全屏', includes: [ 'Calendar' ] },
  {
    name: 'multiple',
    label: '是否可多选',
    includes: [ 'Select' ]
  },
  {
    label: '是否有边框',
    name: 'bordered',
    includes: [ 'Input' ]
  },
  { label: '允许半选', name: 'allowHalf', includes: [ 'Rate' ] },
  {
    label: '高亮第一个选项',
    name: 'defaultActiveFirstOption',
    includes: [ 'Select', 'AutoComplete' ]
  },
  {
    label: '下拉菜单和选择器同宽',
    name: 'dropdownMatchSelectWidth',
    includes: [ 'Select', 'AutoComplete', 'TreeSelect' ]
  }
]
  
/**
 * 通用组件属性
 */
export const baseComponentCommonAttrs: IBaseFormAttrs[] = [
  {
    label: '尺寸',
    name: 'size',
    component: RadioGroup,
    componentProps: {
      options: [
        { label: '大', value: 'large' },
        { label: '中', value: 'middle' },
        { label: '小', value: 'small' }
      ]
    },
    includes: [ 'Input', 'InputNumber' ]
  },
  {
    label: '占位符',
    name: 'placeholder',
    component: Input,
    componentProps: {
      placeholder: '请输入占位符'
    },
    includes: [ 
      'Input', 
      'InputTextArea',
      'MonthPicker'
    ]
  },
  {
    label: '样式',
    name: 'style',
    component: Input,
    componentProps: {
      placeholder: '请输入样式'
    }
  },
  {
    name: 'open',
    label: '一直展开下拉菜单',
    component: RadioGroup,
    componentProps: {
      options: [
        { label: '默认', value: undefined },
        { label: '是', value: true },
        { label: '否', value: false }
      ]
    },
    includes: [ 'Select', 'AutoComplete' ]
  }
]

const componentAttrs: IBaseComponentProps = {
  Input: [
    {
      name: 'type',
      label: '类型',
      component: Select,
      componentProps: {
        options: [
          { label: '文本', value: 'text' },
          { label: '按钮', value: 'button' },
          { label: '复选框', value: 'checkbox' },
          { label: '颜色', value: 'color' },
          { label: '日期', value: 'date' },
          { label: '日期-无时区', value: 'datetime-local' },
          { label: '邮箱', value: 'email' },
          { label: '文件', value: 'file' },
        ]
      }
    },
    {
      name: 'defaultValue',
      label: '默认值',
      component: Input,
      componentProps: {
        placeholder: '请输入默认值'
      }
    },
    {
      name: 'prefix',
      label: '前缀',
      component: Input,
      componentProps: {
        placeholder: '请输入前缀'
      }
    },
    {
      name: 'suffix',
      label: '后缀',
      component: Input,
      componentProps: {
        placeholder: '请输入后缀'
      }
    },
    {
      name: 'addonBefore',
      label: '前置标签',
      component: Input,
      componentProps: {
        placeholder: '请输入前置标签'
      }
    },
    {
      name: 'addonAfter',
      label: '后置标签',
      component: Input,
      componentProps: {
        placeholder: '请输入后置标签'
      }
    },
    {
      name: 'maxLength',
      label: '最大长度',
      component: InputNumber,
      componentProps: {
        placeholder: '请输入最大长度'
      }
    }
  ],

  Checkbox: [
    {
      label: '设置indeterminate状态',
      name: 'indeterminate',
      component: 'Checkbox'
    }
  ],

  RadioGroup: [
    {
      name: 'buttonStyle',
      label: 'RadioButton的风格样式',
      component: RadioGroup,
      componentProps: {
        options: [
          {
            label: 'outline',
            value: 'outline',
          },
          {
            label: 'solid',
            value: 'solid',
          },
        ],
      },
    },
    {
      name: 'optionType',
      label: 'options类型',
      component: RadioGroup,
      componentProps: {
        options: [
          {
            label: '默认',
            value: 'default',
          },
          {
            label: '按钮',
            value: 'button',
          },
        ],
      },
    },
    {
      name: 'size',
      label: '尺寸',
      component: RadioGroup,
      componentProps: {
        options: [
          {
            label: '默认',
            value: 'default',
          },
          {
            label: '大',
            value: 'large',
          },
          {
            label: '小',
            value: 'small',
          },
        ],
      },
    },
  ],

  AutoComplete: [
    {
      name: 'defaultOpen',
      label: '是否默认打开下拉菜单',
      component: 'Checkbox'
    },
    {
      name: 'backfill',
      label: '是否自动回填',
      component: 'Switch',
      componentProps: {
        span: 8
      }
    }
  ],

  PIconPicker: [
    {
      label: '模式',
      name: 'mode',
      component: RadioGroup,
      componentProps: {
        options: [
          { label: 'ICONIFY', value: null },
          { label: 'SVG', value: 'svg' },
        ]
      }
    }
  ],

  InputNumber: [
    {
      name: 'defaultValue',
      label: '默认值',
      component: InputNumber,
      componentProps: {
        placeholder: '请输入默认值'
      }
    },
    {
      name: 'max',
      label: '最大值',
      component: InputNumber,
      componentProps: {
        placeholder: '请输入最大值'
      }
    },
    {
      name: 'min',
      label: '最小值',
      component: InputNumber,
      componentProps: {
        placeholder: '请输入最小值'
      }
    },
    {
      name: 'step',
      label: '步长',
      component: InputNumber,
      componentProps: {
        placeholder: '请输入步长'
      }
    },
    {
      name: 'precision',
      label: '数值精度',
      component: InputNumber,
      componentProps: {
        placeholder: '请输入数值精度'
      }
    },
    {
      name: 'decimalSeparator',
      label: '小数点',
      component: Input,
      componentProps: {
        placeholder: '请输入小数点'
      }
    },
    {
      name: 'addonBefore',
      label: '前置标签',
      component: Input,
      componentProps: {
        placeholder: '请输入前置标签'
      }
    },
    {
      name: 'addonAfter',
      label: '后置标签',
      component: Input,
      componentProps: {
        placeholder: '请输入后置标签'
      }
    },
    {
      name: 'controls',
      label: '是否显示增减按钮',
      component: 'Checkbox'
    },
    {
      name: 'keyboard',
      label: '是否用键盘快捷键',
      component: 'Checkbox'
    },
    {
      name: 'stringMode',
      label: '字符值模式',
      component: 'Checkbox'
    },
    {
      name: 'bordered',
      label: '是否显示边框',
      component: 'Checkbox'
    }
  ],

  MonthPicker: [
    {
      label: '展示格式',
      name: 'format',
      component: Input,
      componentProps: {
        placeholder: 'YYYY-MM'
      }
    },
    {
      name: 'valueFormat',
      label: '绑定值格式(valueFormat)',
      component: Input,
      componentProps: {
        placeholder: 'YYYY-MM'
      }
    }
  ],

  DatePicker: [
    {
      label: '展示格式',
      name: 'format',
      component: Input,
      componentProps: {
        placeholder: 'YYYY-MM-DD'
      }
    },
    {
      name: 'valueFormat',
      label: '绑定值格式(valueFormat)',
      component: Input,
      componentProps: {
        placeholder: 'YYYY-MM-DD'
      }
    }
  ],

  RangPicker: [
    {
      label: '展示格式',
      name: 'format',
      component: Input,
      componentProps: {
        placeholder: 'YYYY-MM-DD HH:mm:ss'
      }
    },
    {
      name: 'valueFormat',
      label: '绑定值格式(valueFormat)',
      component: Input,
      componentProps: {
        placeholder: 'YYYY-MM-DD'
      }
    }
  ],

  TimePicker: [
    {
      name: 'format',
      label: '展示格式（format）',
      component: Input,
      componentProps: {
        placeholder: 'YYYY-MM',
      },
    },
    {
      name: 'valueFormat',
      label: '绑定值格式（valueFormat）',
      component: Input,
      componentProps: {
        placeholder: 'YYYY-MM',
      },
    },
  ],

  Slider: [
    {
      name: 'min',
      label: '最小值',
      component: InputNumber,
      componentProps: {
        placeholder: '请输入最小值'
      }
    },
    {
      name: 'max',
      label: '最大值',
      component: InputNumber,
      componentProps: {
        placeholder: '请输入最大值'
      }
    },
    {
      name: 'step',
      label: '步长',
      component: InputNumber,
      componentProps: {
        placeholder: '请输入步长'
      }
    },
    {
      name: 'tooltipPlacement',
      label: 'Tooltip 展示位置',
      component: Select,
      componentProps: {
        options: [
          { value: 'top', label: '上' },
          { value: 'left', label: '左' },
          { value: 'right', label: '右' },
          { value: 'bottom', label: '下' },
          { value: 'topLeft', label: '上右' },
          { value: 'topRight', label: '上左' },
          { value: 'bottomLeft', label: '右下' },
          { value: 'bottomRight', label: '左下' },
          { value: 'leftTop', label: '左下' },
          { value: 'leftBottom', label: '左上' },
          { value: 'rightTop', label: '右下' },
          { value: 'rightBottom', label: '右上' },
        ],
      },
    },
    {
      name: 'tooltipVisible',
      label: '始终显示Tooltip',
      component: 'Checkbox'
    },
    {
      name: 'dots',
      label: '只能拖拽到刻度上',
      component: 'Checkbox'
    },
    {
      name: 'range',
      label: '双滑块模式',
      component: 'Checkbox'
    },
    {
      name: 'vertical',
      label: '垂直方向',
      component: 'Checkbox'
    },
    {
      name: 'reverse',
      label: '反向坐标轴',
      component: 'Checkbox'
    },
    {
      name: 'included',
      label: '值是否是包含关系',
      component: 'Checkbox'
    }
  ],

  Rate: [
    {
      label: '默认值',
      name: 'defaultValue',
      component: InputNumber,
      componentProps: {
        placeholder: '请输入默认值'
      }
    },
    {
      name: 'count',
      label: '星星个数',
      component: InputNumber,
      componentProps: {
        placeholder: '请输入星星个数',
        wrapCol: { span: 24 }
      }
    },
    // {
    //   name: 'allowHalf',
    //   label: '是否允许半选',
    //   component: 'Checkbox'
    // }
  ],

  Switch: [
    { 
      name: 'checkedChildren',
      label: '选中时的内容',
      component: Input,
      componentProps: {
        placeholder: '请输入选中时的内容'
      }
    },
    {
      name: 'unCheckedChildren',
      label: '非选中时的内容',
      component: Input,
      componentProps: {
        placeholder: '请输入非选中时的内容'
      }
    },
    {
      name: 'checkedValue',
      label: '选中时的值',
      component: Input,
      componentProps: {
        placeholder: '请输入选中时的值'
      }
    },
    {
      name: 'unCheckedValue',
      label: '非选中时的值',
      component: Input,
      componentProps: {
        placeholder: '请输入非选中时的值'
      }
    },
    {
      name: 'loading',
      label: '加载中的开关',
      component: 'Checkbox'
    },
    {
      name: 'size',
      label: '尺寸',
      component: RadioGroup,
      componentProps: {
        options: [
          {
            label: '默认',
            value: 'default',
          },
          {
            label: '小',
            value: 'small',
          },
        ],
      },
    },
  ],

  Upload: [
    {
      name: 'action',
      label: '上传地址',
      component: Input
    },
    {
      name: 'name',
      label: '附件参数名（name）',
      component: 'Input',
    },
  ],

  Cascader: [
    {
      name: 'expandTrigger',
      label: '次级展开方式(默认click)',
      component: RadioGroup,
      componentProps: {
        options: [
          {
            label: 'click',
            value: 'click',
          },
          {
            label: 'hover',
            value: 'hover',
          },
        ],
      },
    },
  ],

  Transfer: [
    {
      name: 'oneWay',
      label: '展示为单向样式',
      component: 'Checkbox',
    },
    {
      name: 'pagination',
      label: '使用分页样式',
      component: 'Checkbox',
    },
    {
      name: 'showSelectAll',
      label: '展示全选勾选框',
      component: 'Checkbox',
    },
  ],

  TreeSelect: [
    {
      name: 'defaultValue',
      label: '默认值',
      component: Input,
      componentProps: {
        placeholder: '请输入默认值',
      },
    },
    {
      name: 'searchPlaceholder',
      label: '搜索框默认文字',
      component: Input,
      componentProps: {
        placeholder: '请输入搜索框默认文字',
      },
    },
    {
      name: 'treeNodeFilterProp',
      label: '输入项过滤对应的 treeNode 属性',
      component: Input,
      componentProps: {
        defaultValue: 'value',
      },
    },
    {
      name: 'treeNodeLabelProp',
      label: '作为显示的 prop 设置',
      component: Input,
      componentProps: {
        defaultValue: 'title',
      },
    },
    {
      name: 'popupClassName',
      label: '下拉菜单的 className 属性',
      component: Input,
      componentProps: {
        placeholder: '请输入下拉菜单的 className 属性',
      },
    },

    {
      name: 'labelInValue',
      label: '选项的label包装到value中',
      component: 'Checkbox',
    },
    {
      name: 'treeIcon',
      label: '展示TreeNode title前的图标',
      component: 'Checkbox',
    },
    {
      name: 'treeCheckable',
      label: '选项可勾选',
      component: 'Checkbox',
    },
    {
      name: 'treeCheckStrictly',
      label: '节点选择完全受控',
      component: 'Checkbox',
    },
    {
      name: 'treeDefaultExpandAll',
      label: '默认展开所有',
      component: 'Checkbox',
    },
    {
      name: 'treeLine',
      label: '是否展示线条样式',
      component: 'Checkbox',
    },
    {
      name: 'maxTagCount',
      label: '最多显示多少个 tag',
      component: InputNumber,
      componentProps: {
        placeholder: '最多显示多少个 tag',
      },
    },
    {
      name: 'size',
      label: '尺寸',
      component: RadioGroup,
      componentProps: {
        options: [
          {
            label: '默认',
            value: 'default',
          },
          {
            label: '小',
            value: 'small',
          },
        ],
      },
    },
  ],


}


componentAttrs['StrengthMeter'] = componentAttrs['Input']
Reflect.deleteProperty(componentAttrs['StrengthMeter'], 'type')
Reflect.deleteProperty(componentAttrs['StrengthMeter'], 'defaultValue')

export const baseComponentAttrs: IBaseComponentProps = componentAttrs
