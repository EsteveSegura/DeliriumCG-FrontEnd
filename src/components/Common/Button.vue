<template>
  <button @click='handleEvent'>{{ displayText }}</button>
</template>

<script>
export default {
  name: "InputText",
  props: {
    displayText: String,
    actionName: String
  },
  
  setup(props, context) {
    const handleEvent = () => {
      context.emit("action", props.actionName);
    };

    return { handleEvent };
  },
};
</script>

<style></style>
