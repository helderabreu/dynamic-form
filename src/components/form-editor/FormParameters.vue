<template>
  <div class="flex justify-between items-center text-lg font-bold px-4 py-2">
    <span>Parameters</span>
    <button type="button" class="add-new-field-button icon-button" @click="addNewFormField">
      <font-awesome-icon icon="fa-solid fa-plus" class="w-4 h-4" />
    </button>
  </div>

  <div class="w-full text-sm text-left">
    <div class="form-editor-grid">
      <span class="col-span-2">Type</span>
      <span class="col-span-2">Id</span>
      <span class="col-span-4">Name</span>
      <span class="col-span-2">Default</span>
      <span class="col-span-1">Required</span>
      <span class="col-span-1">Actions</span>
    </div>
    
    <div class="divider border-b border-gray-300 my-2"></div>

    <draggable v-model="formFields" tag="div" handle=".handle" itemKey="index => index">
      <template #item="{ element: field, index }">
        <div class="fields-generator form-editor-grid">
          <select class="field-type col-span-2" name="fieldType" v-model="field.type">
            <option v-for="(type, i) in formFieldTypes" :key="i" :value="type" :selected="field.type === type">
              {{ type }}
            </option>
          </select>
          <template v-if="field.type === formFieldTypes.divider">
            <DividerGenerator :field="field"></DividerGenerator>
          </template>
          <template v-else-if="field.type === formFieldTypes.input">
            <InputTextGenerator :field="field"></InputTextGenerator>
          </template>
          <template v-else-if="field.type === formFieldTypes.number">
            <InputNumberGenerator :field="field"></InputNumberGenerator>
          </template>
          <template v-else>
            <CheckboxGenerator :field="field"></CheckboxGenerator>
          </template>
          <div class="grid grid-cols-2 col-span-1 content-center">
            <button type="button" class="justify-self-start w-8 h-8 rounded-sm hover:bg-gray-100 cursor-move"
              :class="{ 'handle': formFields?.length > 1 }" :disabled="formFields?.length <= 1">
              <font-awesome-icon icon="fa-solid fa-list-ol" />
            </button>
            <button type="button"
              class="delete-button justify-self-start w-8 h-8 cursor-pointer rounded-sm text-red-500 hover:bg-red-100"
              @click="deleteFormField(index)">
              <font-awesome-icon icon="fa-solid fa-trash-can" />
            </button>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, Ref, ref } from 'vue';
import draggable from 'vuedraggable';
import { FormField } from '@/models/form-field.model';
import { FormFieldTypes } from '@/models/form-field-types.enum';
import CheckboxGenerator from './CheckboxGenerator.vue';
import DividerGenerator from './DividerGenerator.vue';
import InputNumberGenerator from './InputNumberGenerator.vue';
import InputTextGenerator from './InputTextGenerator.vue';

export default defineComponent({
  name: 'FormParameters',
  components: {
    draggable,
    CheckboxGenerator,
    DividerGenerator,
    InputNumberGenerator,
    InputTextGenerator
  },
  setup() {
    const formFieldTypes = FormFieldTypes;
    const formFields: Ref<FormField[]> = ref([]);
    const instance = getCurrentInstance();

    const addNewFormField = () => {
      const newFormField: FormField = {
        type: FormFieldTypes.divider,
        id: '',
        name: '',
        default: '',
        required: false
      };
      formFields.value.push(newFormField);
      updateValue();
    };

    const deleteFormField = (index: number) => {
      formFields.value.splice(index, 1);
      updateValue();
    }

    const updateValue = () => {
      if (instance) {
        instance.emit('form-fields', formFields.value);  
      }
    };

    return { formFieldTypes, formFields, addNewFormField, deleteFormField, updateValue }
  }
});
</script>

<style scoped>
.form-editor-grid {
  @apply grid grid-cols-12 gap-4 col-span-12 px-4 py-2;
}
</style>