import { mount } from '@vue/test-utils';
import { FormField } from '@/models/form-field.model';
import { FormFieldTypes } from '@/models/form-field-types.enum';
import DividerGenerator from '@/components/form-editor/DividerGenerator.vue';

describe('DividerGenerator', () => {
  it('renders inputs and checkbox with correct initial values', async () => {
    const field: FormField = {
      type: FormFieldTypes.input,
      id: 'fieldId',
      name: 'FieldName',
      default: 'Default value',
      required: true,
    };

    const wrapper = mount(DividerGenerator, {
      props: {
        field
      },
    });

    await wrapper.vm.$nextTick(); 

    const inputs = wrapper.findAll('input');
    expect(inputs).toHaveLength(1);
    expect(inputs[0].element.value).toBe(field.id);
  });
});