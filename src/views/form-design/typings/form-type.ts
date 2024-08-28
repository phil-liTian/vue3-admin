import { IVFormComponent, IFormConfig } from "./v-form-component";

export interface IFormDesignMethods {
  handleCopy: (schema?: IVFormComponent, isCopy?: Boolean ) => void;
  handleSetSelectItem: (schema?: IVFormComponent) => void;
  setFormConfig: (config: Partial<IFormConfig>) => void;
}

export interface IToolbarMethods {
  showModal?: (formConfig: IFormConfig) => void
}