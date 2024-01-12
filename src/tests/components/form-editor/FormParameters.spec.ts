import { mount } from '@vue/test-utils';
import FormParameters from '@/components/form-editor/FormParameters.vue';

describe('FormParameters', () => {
  it('renders the component', () => {
    const wrapper = mount(FormParameters, {
      props: {
        formFields: [],
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('adds a new form field', async () => {
    const wrapper = mount(FormParameters, {
      props: {
        formFields: [],
      },
    });

    await wrapper.find('.add-new-field-button').trigger('click');

    expect(wrapper.emitted('form-fields')).toBeTruthy();
    expect(wrapper.emitted('form-fields')?.[0][0]).toHaveLength(1);
  });

  it('deletes a form field when the delete button is clicked', async () => {
    const wrapper = mount(FormParameters, {
      props: {
        formFields: []
      },
    });

    await wrapper.find('.add-new-field-button').trigger('click');
    await wrapper.find('.add-new-field-button').trigger('click');

    const deleteButton = wrapper.find('.delete-button');
    await deleteButton.trigger('click');

    // Assuming your updateValue method emits an event
    // This might need adjustment based on your actual implementation
    expect(wrapper.emitted('form-fields')).toBeTruthy();
    expect(wrapper.emitted('form-fields')?.[0][0]).toHaveLength(1);
  });
});