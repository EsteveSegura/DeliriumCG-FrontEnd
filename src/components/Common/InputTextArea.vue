<template>
  <textarea
    v-model="text"
    :name="name"
    :id="id"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)" 
  ></textarea>
</template>

<script>
import { ref } from "vue";

export default {
  name: "InputTextArea",
  props: {
    name: String,
    id: String,
    placeholder: String,
  },
  setup() {
    const text = ref("");

    return {
      text,
    };
  },
};
</script>

<style></style>
