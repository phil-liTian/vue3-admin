import { FormProps } from 'ant-design-vue/lib/form/Form';
import { ColEx } from '@c/PBase/Form/src/types/index'
import { FormItem } from '@c/PBase/Form/src/types/formItem'

export type PickntAntFormProps = Pick<FormProps, 'layout' | 'labelAlign' | 'labelCol' | 'wrapperCol' | 'colon' | 'size' | 'hideRequiredMark' | 'disabled'>

export interface IVFormComponent {
  // 唯一标识
  key?: string;

  // 组件名称
  component: string;

  // label内容
  label?: string;

  // 自定义icon内容
  icon?: string;

  // 对应字段
  field?: string;

  // 自定义属性 同form组件的属性
  componentProps?: any;

  // 栅格属性
  colProps?: Partial<ColEx>;

  //
  itemProps?: Partial<FormItem>;

  helpMessage?: string;

  hidden?: boolean

}

export type LabelLayout = 'flex' | 'Grid'

export interface IFormConfig extends PickntAntFormProps {
  activeKey?: number;

  schemas?: IVFormComponent[];

  currentItem?: IVFormComponent;

  layout?: 'horizontal' | 'vertical' | 'inline';

  labelLayout?: LabelLayout;

  labelWidth?: number;
}
