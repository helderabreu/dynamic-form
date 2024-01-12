<template>
  <div class="table-grid">
    <input class="col-span-9" type="text" v-model="localField.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { FormField } from '@/models/form-field.model';

export default defineComponent({
  name: 'DividerGenerator',
  props: {
    field: {
      type: Object as () => FormField,
      required: true
    }
  },
  setup(props, { emit }) {
    const localField: Ref<FormField> = ref(props.field);

    const updateValue = () => {
      emit('update:field', localField.value);
    };

    return { localField, updateValue };
  }
});
</script>

<style scoped>
.table-grid {
  @apply grid grid-cols-9 gap-4 col-span-9;
}
</style>