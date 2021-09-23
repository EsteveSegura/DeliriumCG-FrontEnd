<template>
  <button @click="handleEvent">{{ displayText }}</button>
</template>

<script>
export default {
  name: "InputText",
  props: {
    displayText: String,
    actionName: String,
  },

  setup(props, context) {
    const handleEvent = () => {
      context.emit("action", props.actionName);
    };

    return { handleEvent };
  },
};
</script>

<style>
button {
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  color: var(--white);
  background-color: var(--purple);
  padding: 0.4rem 0.8rem;
  margin: 0.5rem 0.3rem;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
}
</style>
