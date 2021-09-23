<template>
  <input
    v-model="text"
    type="text"
    :name="name"
    :id="id"
    :placeholder="placeholder"
     @input="$emit('update:modelValue', $event.target.value)" 
  />
</template>

<script>
import { ref } from "vue";

export default {
  name: "InputText",
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
