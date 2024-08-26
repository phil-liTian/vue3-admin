import { IVFormComponent } from "./v-form-component";

export interface IFormDesignMethods {
  handleCopy: (schema?: IVFormComponent, isCopy?: Boolean ) => void;
  handleSetSelectItem: (schema?: IVFormComponent) => void;
}