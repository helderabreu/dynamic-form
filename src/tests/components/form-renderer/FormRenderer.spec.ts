import { mount } from '@vue/test-utils';
import FormRenderer from '@/components/form-renderer/FormRenderer.vue';

describe('FormRenderer', () => {
  it('doesn`t render the form if no serialized form is present', async () => {
    const wrapper = mount(FormRenderer);
    const deserializedFormContainer = wrapper.find('form.deserialized-form');
    expect(deserializedFormContainer.exists()).toBe(false);
  });

  it('renders deserialized form correctly', async () => {
    const wrapper = mount(FormRenderer);
    const serializedFormTextarea = wrapper.find('textarea.serialized-form');
    await serializedFormTextarea.setValue('SGVsbG8gd29ybGQ=');

    const renderButton = wrapper.find('.render-button');
    await renderButton.trigger('click');

    // Wait for the next tick to ensure reactivity
    await wrapper.vm.$nextTick();

    const deserializedForm = wrapper.find('form.deserialized-form');
    expect(deserializedForm.exists()).toBe(true);
  });
});