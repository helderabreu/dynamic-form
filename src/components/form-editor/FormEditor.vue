<template>
  <section class="parameters rounded border border-gray-300 mx-4 my-4 py-2">
    <FormParameters @form-fields="handleFormFields"></FormParameters>
  </section>

  <section class="serializer rounded border border-gray-300 mx-4 my-4 px-4 py-2">
    <FormSerializer :form-fields="formFields"></FormSerializer>
  </section>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { FormField } from '@/models/form-field.model';
import FormParameters from './FormParameters.vue';
import FormSerializer from './FormSerializer.vue';

export default defineComponent({
  name: 'FormEditor',
  components: {
    FormParameters,
    FormSerializer
},
  setup() {
    const formFields: Ref<FormField[]> = ref([]);

    const handleFormFields = (newFormFields: FormField[]) => {
      formFields.value = newFormFields;
    }

    return { formFields, handleFormFields }
  }
});
</script>