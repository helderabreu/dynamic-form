<template>
  <section class="parameters rounded border border-gray-300 mx-4 my-4 py-2">
    <div class="flex justify-between items-center text-lg font-bold px-4 py-2">
      <span>Parameters</span>
      <button type="button" class="fab" @click="addEmptyFormField">
        <font-awesome-icon icon="fa-solid fa-plus" class="w-4 h-4" />
      </button>
    </div>

    <div class="w-full text-sm text-left">
      <div class="grid grid-cols-12 gap-4 col-span-12 px-4 py-2">
        <span class="col-span-2">Type</span>
        <span class="col-span-2">Id</span>
        <span class="col-span-4">Name</span>
        <span class="col-span-2">Default</span>
        <span class="col-span-1">Required</span>
        <span class="col-span-1">Actions</span>
      </div>
      <div class="divider border-b border-gray-300 my-2"></div>

      <draggable v-model="formFields" tag="div" handle=".handle" itemKey="index">
        <template #item="{ element: field, index }">
          <div class="grid grid-cols-12 gap-4 col-span-12 px-4 py-2">
            <select class="col-span-2" name="fieldType" id="field-type" v-model="field.type">
              <option v-for="(type, i) in formFieldTypes" :key="i" :value="type" :selected="field.type === type">
                {{ type }}
              </option>
            </select>
            <template v-if="field.type === formFieldTypes.divider">
              <input class="col-span-9" type="text" v-model="field.id" />
            </template>
            <template v-if="field.type === formFieldTypes.number || field.type === formFieldTypes.input">
              <input class="col-span-2" type="text" v-model="field.id" />
              <input class="col-span-4" type="text" v-model="field.name" />
              <input class="col-span-2" type="text" v-model="field.default" />
              <input class="col-span-1 justify-self-start" type="checkbox" v-model="field.required" />
            </template>
            <template v-if="field.type === formFieldTypes.checkbox">
              <input class="col-span-2" type="text" v-model="field.id" />
              <input class="col-span-4" type="text" v-model="field.name" />
              <input class="col-span-2 justify-self-start" type="checkbox" v-model="field.default" />
              <input class="col-span-1 justify-self-start" type="checkbox" v-model="field.required" />
            </template>
            <div class="grid grid-cols-2 col-span-1 content-center">
              <button type="button" class="justify-self-start w-8 h-8 cursor-move rounded-sm hover:bg-gray-100"
                :class="{ 'handle': formFields.length > 1 }" :disabled="formFields.length <= 1">
                <font-awesome-icon icon="fa-solid fa-list-ol" />
              </button>
              <button type="button"
                class="justify-self-start w-8 h-8 cursor-pointer rounded-sm text-red-500 hover:bg-red-100"
                @click="deleteFormField(index)">
                <font-awesome-icon icon="fa-solid fa-trash-can" />
              </button>
            </div>
          </div>
        </template>
      </draggable>

    </div>
  </section>

  <section class="serialized rounded border border-gray-300 mx-4 my-4 px-4 py-2">
    <div class="flex justify-between items-center text-lg font-bold pt-2 pb-4">
      <span>Serialized form</span>
      <button type="button" class="fab"
        :class="{ 'button-disabled': formFields.length <= 1 }" @click="copyToClipboard" :disabled="!serializedForm">
        <font-awesome-icon icon="fa-solid fa-copy" class="w-4 h-4" />
      </button>
    </div>
    <textarea class="w-full border border-gray-300 rounded-sm" name="serialized-form" id="serialized-form" rows="6"
      v-model="serializedForm" readonly></textarea>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, Ref, ref } from 'vue';
import draggable from 'vuedraggable';

enum FormFieldTypes {
  divider = "Divider",
  number = "Number",
  input = "Input",
  checkbox = "Checkbox"
}

interface FormField {
  type: FormFieldTypes,
  id: string,
  name: string,
  default: string | boolean,
  required: boolean
}

export default defineComponent({
  name: 'EditView',
  components: {
    draggable
  },
  setup() {
    const formFieldTypes = FormFieldTypes;
    const formFields: Ref<FormField[]> = ref([]);

    const serializedForm = computed(() => {
      let htmlString = '';
      formFields.value.forEach((field: FormField) => {
        let htmlFieldString = '';
        switch (field.type) {
          case FormFieldTypes.divider:
            htmlFieldString = `<h2>${field.id}</h2>`;
            break;
          case FormFieldTypes.number:
            htmlFieldString = `<div class="input-container"><label for="${field.id}">${field.name}</label><input type='number' id='${field.id}' name='${field.id}' value='${field.default}'` + (field.required ? ` required` : '') + `/></div>`;
            break;
          case FormFieldTypes.input:
            htmlFieldString = `<div class="input-container"><label for="${field.id}">${field.name}</label><input type='text' id='${field.id}' name='${field.id}' value='${field.default}'` + (field.required ? ` required` : '') + `/></div>`;
            break;
          case FormFieldTypes.checkbox:
            htmlFieldString = `<div class="checkbox-container"><input type='checkbox' id='${field.id}' name='${field.id}'` + (field.default ? ` checked` : ``) + (field.required ? ` required` : '') + `/><label for="${field.id}">${field.name}</label></div>`;
            break;
          default:
            break;
        }
        htmlString += htmlFieldString;
      });
      return btoa(htmlString);
    });

    const addEmptyFormField = () => {
      const newFormField: FormField = {
        type: FormFieldTypes.divider,
        id: '',
        name: '',
        default: '',
        required: false
      };
      formFields.value.push(newFormField);
    };

    const deleteFormField = (index: number) => {
      formFields.value.splice(index, 1);
    }

    return { formFieldTypes, formFields, serializedForm, addEmptyFormField, deleteFormField }
  },
  methods: {
    onDragEnd(event: { oldIndex: number; newIndex: number }) {
      const field = this.formFields[event.oldIndex];
      this.formFields.splice(event.oldIndex, 1);
      this.formFields.splice(event.newIndex, 0, field);
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.serializedForm)
        .then(() => {
          alert('Text copied to clipboard');
        })
        .catch(() => {
          alert('Error copying text to clipboad');
        });
    }
  },
});
</script>