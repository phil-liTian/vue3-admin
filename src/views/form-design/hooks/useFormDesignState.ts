import { inject, Ref } from "vue";
import { IFormConfig } from "../typings/v-form-component";
import { IFormDesignMethods } from "../typings/form-type";

export function useFormDesignState()  {
  const formConfig = inject('formConfig') as Ref<IFormConfig>
  const formDesignMethods = inject('formDesignMethods') as IFormDesignMethods

  return { formConfig, formDesignMethods }
}
