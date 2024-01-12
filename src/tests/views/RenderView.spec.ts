import { mount } from '@vue/test-utils';
import RenderView from '@/views/RenderView.vue';
import FormRenderer from '@/components/form-renderer/FormRenderer.vue';

describe('RenderView', () => {
  it('renders the FormRenderer component', () => {
    const wrapper = mount(RenderView);
    expect(wrapper.findComponent(FormRenderer).exists()).toBe(true);
  });
});