import { ColEx } from ".";

export interface FormItem {
  
  labelCol: Partial<ColEx>;
  
  wrapperCol: Partial<ColEx>;
  
  label: string;
  
  name: string;
  
  helpMessage?: string;
  
  extra?: string;
  
  validateStatus?: 'success' | 'error' | 'warning' | 'validating';
  
  validateTrigger?: string;
  
  hidden?: boolean;
  
  hideLabel?: boolean;
}