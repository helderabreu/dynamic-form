import { FormFieldTypes } from "./form-field-types.enum"

export interface FormField {
  type: FormFieldTypes,
  id: string,
  name: string,
  default: string | boolean,
  required: boolean
}