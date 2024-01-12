<template>
  <FormEditor></FormEditor>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormEditor from '@/components/form-editor/FormEditor.vue';

export default defineComponent({
  name: 'EditView',
  components: {
    FormEditor
  }
});
</script>