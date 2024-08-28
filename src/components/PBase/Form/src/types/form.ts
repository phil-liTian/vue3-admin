import { VNode } from "vue";
import { ComponentType, ColEx } from ".";
import { propTypes } from "@/utils/propTypes";
import { ButtonProps as AntdButtonProps } from "@/components/Button";
import { RuleObject } from "ant-design-vue/es/form";

/*
 * @Date: 2024-06-11 10:50:55
 * @LastEditors: phil_litian
 */
export type Rules = Partial<RuleObject> & {
  trigger?: 'blur' | 'change' | ['blur', 'change']
}

export interface RenderCallbackParams {
  schema?: FormSchema;
  values?: Recordable;
  model?: Recordable;
  field?: string
}

export type RenderOpts = {
  disabled: boolean;
  [key: string]: any
}

interface BasicFormSchema<T extends ComponentType = any> {
  field: string;
  label?: string | (() => string | VNode);
  labelWidth?: number | string;
  helpMessage?: string | string[] | ((renderCallbackParams?: RenderCallbackParams) => string | string[]);
  colProps?: Partial<ColEx>;
  defaultValue?: any;
  suffix?: string | number | (() => string | VNode);

  // customer
  renderComponentContent?: VNode | VNode[] | string | ((renderCallbackParams?: RenderCallbackParams, options?: RenderOpts) => any);
  renderColContent?: (renderCallbackParams?: RenderCallbackParams, options?: RenderOpts) => VNode | VNode[] | string;
  colSlot?: string;
  componentProps?: any;

  // dynamic
  show?: boolean;
  ifShow?: boolean;

  // 是否必填 rule
  required?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);
  rules?: Rules[],
  rulesMessageJoinLabel?: boolean;

  // 事件名
  changeEvent?: string

  // customer
  render?: (renderCallbackParams?: RenderCallbackParams, options?: RenderOpts) => VNode | VNode | string[];

  dynamicDisabled?: boolean | ((renderCallbackParams: RenderCallbackParams) => boolean);

  
}

export interface FormActionType {
  submit: () => Promise<void>;
  setProps: (formProps: Partial<FormProps>) => Promise<void>
  setFieldsValue: (values: Recordable) => Promise<void>;
  resetFields: () => Promise<void>;
  getFieldsValue: () => Promise<void>;
  appendSchemaByField: ( schema: FormSchema | FormSchema[], prefixField?: string, first?: boolean ) => void;
  removeSchemaByField: (field: string | string[]) => void;
  validateFields: (nameList?: string | string[]) => Promise<any>;
  validate?: (nameList?: string | string[]) => Promise<any>;
  clearValidate: (nameList?: undefined | string | string[]) => Promise<any>;
  updateSchema: (data: Partial<FormSchemaInner> | Partial<FormSchemaInner>[]) => Promise<void>
}

type RegisterFn = (formEl: FormActionType) => void 
export type UseFormReturnType = [ RegisterFn, FormActionType ]

export interface ComponentFormSchema<T extends ComponentType = any> extends BasicFormSchema {
  component?: T
}

export interface SlotFormSchema extends BasicFormSchema {
  slot?: string;
}

type ComponentFormSchemaType<T extends ComponentType = ComponentType> = T extends any ? ComponentFormSchema<T> : unknown

export type FormSchema = ComponentFormSchemaType | SlotFormSchema

export type FormSchemaInner = Partial<ComponentFormSchema> & BasicFormSchema & Partial<SlotFormSchema>


export interface ButtonProps extends AntdButtonProps {
  text?: string
}

export interface FormProps {
  schemas?: FormSchema[],

  // FormItem
  labelWidth?: Number,
  size?: 'default' | 'small' | 'large',
  disabled?: Boolean,
  readonly?: Boolean,
  compact?: Boolean,
  actionColOptions?: Partial<ColEx>,
  baseColProps?: Partial<ColEx>,

  // FormAction
  showActionButtonGroup?: Boolean,
  showSubmitButton?: Boolean,
  showResetButton?: Boolean,
  showAdvancedButton?: Boolean,
  resetButtonOptions?: Partial<ButtonProps>,
  submitButtonOptions?: Partial<ButtonProps>,

  autoSetPlaceholder?: Boolean,
  rulesMessageJoinLabel?: Boolean,
  // advance
  alwaysShowLines?: number
}
