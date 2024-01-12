<template>
  <section class="deserialized rounded border border-gray-300 mx-4 my-4 px-4 py-2">
    <div class="flex justify-between items-center text-lg font-bold pt-2 pb-4">
      <span>Paste your serialized form below</span>
      <button type="button" class="fab" @click="deserializeForm" :disabled="!serializedForm">
        <font-awesome-icon icon="fa-solid fa-check-to-slot" class="w-4 h-4" />
      </button>
    </div>
    <textarea class="w-full border border-gray-300 rounded-sm" name="serialized-form" id="serialized-form" rows="6"
      v-model="serializedForm"></textarea>
  </section>

  <div class="w-full" v-if="deserializedForm?.length > 0">
    <form class="" v-html="deserializedForm"></form>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';

export default defineComponent({
  name: 'FormRendererView',
  setup() {
    const serializedForm: Ref<string> = ref('');
    const deserializedForm: Ref<string> = ref('');

    return { serializedForm, deserializedForm }
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
  @apply grid grid-cols-1 gap-2 justify-self-start rounded border border-gray-300 mx-4 my-4 p-4;

  h2 {
    @apply text-xl text-black font-bold text-left border-b border-gray-200 py-2 mb-4;
  }

  .input-container {
    @apply flex flex-col text-left mb-2;

    input {
      @apply text-black;
    }

    label {
      @apply text-xs;
    }
  }

  .checkbox-container {
    @apply text-left mb-2;

    input {
      @apply mr-4;
    }
  }
}
</style>