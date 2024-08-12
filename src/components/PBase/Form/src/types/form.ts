import { VNode } from "vue";
import { ComponentType, ColEx } from ".";

/*
 * @Date: 2024-06-11 10:50:55
 * @LastEditors: phil_litian
 */
interface BasicFormSchema<T extends ComponentType = any> {
  field: string;
  label?: string | (() => string | VNode);
  colProps?: Partial<ColEx>;
  defaultValue?: any;
  suffix?: string | number | (() => string | VNode);

  renderComponentContent?: VNode | VNode[] | string | (() => any);

  componentProps?: any;
}

export interface FormActionType {
  submit: () => Promise<void>;
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
