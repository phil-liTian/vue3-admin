import { VNode } from "vue";
import { ComponentType, ColEx } from ".";
import { propTypes } from "@/utils/propTypes";
import { ButtonProps as AntdButtonProps } from "@/components/Button";

/*
 * @Date: 2024-06-11 10:50:55
 * @LastEditors: phil_litian
 */
interface BasicFormSchema<T extends ComponentType = any> {
  field: string;
  label?: string | (() => string | VNode);
  labelWidth?: number | string;
  colProps?: Partial<ColEx>;
  defaultValue?: any;
  suffix?: string | number | (() => string | VNode);

  renderComponentContent?: VNode | VNode[] | string | (() => any);

  componentProps?: any;
}

export interface FormActionType {
  submit: () => Promise<void>;
  setProps: (formProps: Partial<FormProps>) => Promise<void>
  // setFieldsValue: () => void;
}

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

  // FormAction
  showActionButtonGroup?: Boolean,
  showSubmitButton?: Boolean,
  showResetButton?: Boolean,
  resetButtonOptions?: Partial<ButtonProps>,
  submitButtonOptions?: Partial<ButtonProps>,
}
