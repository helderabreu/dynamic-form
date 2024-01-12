<template>
  <FormRenderer></FormRenderer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormRenderer from '@/components/form-renderer/FormRenderer.vue';

export default defineComponent({
  name: 'RenderView',
  components: {
    FormRenderer
  }
});
</script>