<template>
  <div>
    {{ name }} <br />
    <n-button type="primary" size="medium" @click="triggerPulse(name)">
      {{ name }}
    </n-button>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { NButton, useMessage } from "naive-ui";

export default {
  name: "HelloWorld",
  props: {
    pluginId: String,
    name: String,
  },
  components: {
    NButton,
  },
  setup(props) {
    const API_URL = process.env.VUE_APP_API_URL
    const token = ref("");
    const message = useMessage();

    async function triggerPulse(value) {
      try {
        const authRoute = await axios.post(
          `${API_URL}/api/v1/plugins/${props.pluginId}/trigger/pulse`,
          { name: value },
          {
            headers: {
              authorization: `Bearer ${localStorage.token}`,
            },
          }
        );
        console.log(authRoute);
        message.success(`the '${value}' action has been launched`);
      } catch (error) {
        message.error(`the '${value}' action cannot be launched`);
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
