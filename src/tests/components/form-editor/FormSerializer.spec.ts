import { mount } from '@vue/test-utils';
import { FormField } from '@/models/form-field.model';
import { FormFieldTypes } from '@/models/form-field-types.enum';
import FormSerializer from '@/components/form-editor/FormSerializer.vue';

describe('FormSerializer', () => {
  it('serialized form is empty', async () => {
    const formFields: FormField[] = [];

    const wrapper = mount(FormSerializer, {
      props: {
        formFields
      },
    });

    // Ensure that the component renders without errors
    expect(wrapper.exists()).toBe(true);

    // Check if the serialized form textarea exists and has no current value
    const serializedFormTextArea = wrapper.find('.serialized-form');
    expect(serializedFormTextArea.exists()).toBe(true);
    expect((serializedFormTextArea.element as HTMLInputElement).value.length).toBe(0);
  });

  it('serialized form has content', async () => {
    const formFields: FormField[] = [
      { type: FormFieldTypes.divider, id: 'field1', name: 'Field 1', default: '', required: true }
    ];

    const wrapper = mount(FormSerializer, {
      props: {
        formFields
      },
    });

    // Ensure that the component renders without errors
    expect(wrapper.exists()).toBe(true);

    // Check if the serialized form textarea exists and has no current value
    const serializedFormTextArea = wrapper.find('.serialized-form');
    expect(serializedFormTextArea.exists()).toBe(true);
    expect((serializedFormTextArea.element as HTMLInputElement).value).toBeTruthy();
  });
});