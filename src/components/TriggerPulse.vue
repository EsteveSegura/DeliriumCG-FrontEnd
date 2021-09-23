<template>
  <div>
    {{ name }} <br>
    <Button :displayText="name" :actionName="name" @action="triggerPulse" />
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import Button from "@/components/Common/Button.vue";

export default {
  name: "HelloWorld",
  props: {
    pluginId: String,
    name: String,
  },
  components: {
    Button,
  },
  setup(props) {
    const token = ref("");

    async function triggerPulse(value) {
      try {
        const authRoute = await axios.post(
          `http://localhost:3000/api/v1/plugins/${props.pluginId}/trigger/pulse`,
          { name: value },
          {
            headers: {
              authorization: `Bearer ${localStorage.token}`,
            },
          }
        );
        console.log(authRoute);
      } catch (error) {
        console.log(error);
      }
    }

    return {
      token,
      triggerPulse,
    };
  },
};
</script>

<style scoped></style>
