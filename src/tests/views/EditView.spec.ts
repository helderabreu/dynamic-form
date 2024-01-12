import { mount } from '@vue/test-utils';
import EditView from '@/views/EditView.vue';
import FormEditor from '@/components/form-editor/FormEditor.vue';
import FormSerializer from '@/components/form-editor/FormSerializer.vue';

describe('EditView', () => {
  it('renders the FormEditor component', () => {
    const wrapper = mount(EditView);
    expect(wrapper.findComponent(FormEditor).exists()).toBe(true);
  });

  it('renders the FormSerializer component', () => {
    const wrapper = mount(EditView);
    expect(wrapper.findComponent(FormSerializer).exists()).toBe(true);
  });
});