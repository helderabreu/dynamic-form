import { mount } from '@vue/test-utils';
import { FormField } from '@/models/form-field.model';
import { FormFieldTypes } from '@/models/form-field-types.enum';
import CheckboxGenerator from '@/components/form-editor/CheckboxGenerator.vue';

describe('CheckboxGenerator', () => {
  it('renders inputs and checkbox with correct initial values', async () => {
    const field: FormField = {
      type: FormFieldTypes.input,
      id: 'fieldId',
      name: 'FieldName',
      default: false,
      required: true,
    };

    const wrapper = mount(CheckboxGenerator, {
      props: {
        field
      },
    });

    await wrapper.vm.$nextTick(); 

    const inputs = wrapper.findAll('input');
    expect(inputs).toHaveLength(4);
    expect(inputs[0].element.value).toBe(field.id);
    expect(inputs[1].element.value).toBe(field.name);
    expect(inputs[2].element.checked).toBe(field.default);
    expect(inputs[3].element.checked).toBe(field.required);
  });
});