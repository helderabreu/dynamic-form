<template>
  <div class="flex justify-between items-center text-lg font-bold pt-2 pb-4">
    <span>Serialized form</span>
    <button type="button" class="copy-button icon-button"
      :class="{ 'button-disabled': formFields?.length <= 1 }" @click="copyToClipboard" :disabled="!serializedForm">
      <font-awesome-icon icon="fa-solid fa-copy" class="w-4 h-4" />
    </button>
  </div>
  <textarea class="serialized-form w-full border border-gray-300 rounded-sm p-2" name="serialized-form" rows="6" placeholder="Your serialized form will be generated here"
    v-model="serializedForm" readonly></textarea>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { FormFieldTypes } from '@/models/form-field-types.enum';
import { FormField } from '@/models/form-field.model';

export default defineComponent({
  name: 'FormSerializer',
  props: {
    formFields: {
      type: Object as () => FormField[],
      required: true
    }
  },
  setup(props) {
    const serializedForm = computed(() => {
      let htmlString = '';
      props.formFields.forEach((field: FormField) => {
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

    return { serializedForm }
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.serializedForm)
        .then(() => {
          alert('Text copied to clipboard. Go to the "Render" page to generate your form.');
        })
        .catch(() => {
          alert('Error copying text to clipboad');
        });
    }
  }
});
</script>