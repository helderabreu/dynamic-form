<template>
  <section class="deserialized rounded border border-gray-300 mx-4 my-4 px-4 py-2">
    <div class="flex justify-between items-center text-lg font-bold pt-2 pb-4">
      <span>Paste your serialized form below</span>
      <button type="button" class="w-8 h-8 rounded-full bg-blue-500 text-white shadow cursor-pointer ml-4"
        @click="deserializeForm" :disabled="serializedForm.length === 0">
        <font-awesome-icon icon="fa-solid fa-check-to-slot" class="w-4 h-4" />
      </button>
    </div>
    <textarea class="w-full border border-gray-300 rounded-sm" name="serialized-form" id="serialized-form" rows="6"
      v-model="serializedForm"></textarea>
  </section>

  <div class="w-full" v-if="deserializedForm?.length > 0">
    <form class="grid grid-cols-1 gap-2 p-8" v-html="deserializedForm"></form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FormRendererView',
  data() {
    return {
      serializedForm: 'PGgyPlVzZXIgZm9ybTwvaDI+PGRpdiBjbGFzcz0iaW5wdXQtY29udGFpbmVyIj48bGFiZWwgZm9yPSJpbnB1dC0wMSI+Rmlyc3QgbmFtZTwvbGFiZWw+PGlucHV0IHR5cGU9J3RleHQnIGlkPSdpbnB1dC0wMScgbmFtZT0naW5wdXQtMDEnIHZhbHVlPScnIHJlcXVpcmVkLz48L2Rpdj48ZGl2IGNsYXNzPSJpbnB1dC1jb250YWluZXIiPjxsYWJlbCBmb3I9ImlucHV0LTAyIj5MYXN0IG5hbWU8L2xhYmVsPjxpbnB1dCB0eXBlPSd0ZXh0JyBpZD0naW5wdXQtMDInIG5hbWU9J2lucHV0LTAyJyB2YWx1ZT0nJyByZXF1aXJlZC8+PC9kaXY+PGRpdiBjbGFzcz0iaW5wdXQtY29udGFpbmVyIj48bGFiZWwgZm9yPSJpbnB1dC0wMyI+QWdlPC9sYWJlbD48aW5wdXQgdHlwZT0nbnVtYmVyJyBpZD0naW5wdXQtMDMnIG5hbWU9J2lucHV0LTAzJyB2YWx1ZT0nJyByZXF1aXJlZC8+PC9kaXY+PGRpdiBjbGFzcz0iY2hlY2tib3gtY29udGFpbmVyIj48aW5wdXQgdHlwZT0nY2hlY2tib3gnIGlkPSdpbnB1dC0wNCcgbmFtZT0naW5wdXQtMDQnIGNoZWNrZWQgcmVxdWlyZWQvPjxsYWJlbCBmb3I9ImlucHV0LTA0Ij5JIGFjY2VwdCB0aGUgdGVybXMgYW5kIGNvbmRpdGlvbnM8L2xhYmVsPjwvZGl2Pg==',
      deserializedForm: ''
    }
  },
  methods: {
    deserializeForm() {
      this.deserializedForm = atob(this.serializedForm);
    }
  }
});
</script>

<style lang="scss">
form {
  @apply justify-self-start;

  h2 {
    @apply text-xl font-bold text-left border-b border-gray-300 mb-6;
  }

  .input-container {
    @apply flex flex-col text-left mb-2;
  }

  .checkbox-container {
    @apply text-left mb-2;

    input {
      @apply mr-4;
    }
  }
}
</style>