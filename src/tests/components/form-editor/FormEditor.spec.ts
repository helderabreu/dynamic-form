import { mount } from '@vue/test-utils';
import FormEditor from '@/components/form-editor/FormEditor.vue';
import FormParameters from '@/components/form-editor/FormParameters.vue';
import FormSerializer from '@/components/form-editor/FormSerializer.vue';

describe('FormEditor', () => {
  it('renders FormParameters and FormSerializer components with form fields', () => {
    const wrapper = mount(FormEditor);

    const formParametersComponent = wrapper.findComponent(FormParameters);
    expect(formParametersComponent.exists()).toBe(true);

    const formSerializerComponent = wrapper.findComponent(FormSerializer);
    expect(formSerializerComponent.exists()).toBe(true);
  });
});