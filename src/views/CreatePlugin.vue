<template>
  <div class="container">
    <n-space vertical>
      <n-card
        title="Create Plugin"
        header-style="background-color: var(--dark-blue);"
        content-style="text-align: center; background-color: var(--dark-blue);"
      >
        <n-space vertical>
          <h3>Title</h3>
          <n-input
            v-model:value="title"
            type="text"
            placeholder="Plugin title"
          />
          <h3>Height & Width</h3>
          <n-input-number
            v-model:value="height"
            clearable
            placeholder="height"
          />
          <n-input-number v-model:value="width" clearable placeholder="width" />
          <h3>Src</h3>
          <n-input
            v-model:value="src"
            type="textarea"
            placeholder="Plugin code"
          />
          <h3>Description</h3>
          <n-input
            v-model:value="description"
            type="textarea"
            placeholder="Plugin Description"
          />
        </n-space>
      </n-card>
      <n-button type="primary" size="medium" @click="addPulse">
        Add Pulse Trigger!
      </n-button>

      <div v-for="trigger in triggers" class="" :key="trigger">
        <n-card
          title="Pulse Trigger"
          header-style="background-color: var(--dark-blue);"
          content-style="text-align: center; background-color: var(--dark-blue);"
          v-if="triggers.length != 0"
        >
          <n-space vertical>
            <div>
              <h3>Pulse Title</h3>
              <n-input
                v-model:value="trigger.name"
                type="text"
                placeholder="Pulse name"
              />
              <h3>Pulse to send</h3>
              <n-input
                v-model:value="trigger.pulseToSend"
                type="text"
                placeholder="Pulse payload"
              />
            </div>
          </n-space>
        </n-card>
      </div>

      <n-button type="primary" size="medium" @click="createPlugin">
        Create Plugin!
      </n-button>
    </n-space>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import router from "@/router";

import {
  NInput,
  NButton,
  NInputNumber,
  NCard,
  useMessage,
  NSpace,
} from "naive-ui";

export default {
  name: "CreatePlugin",
  components: {
    NInput,
    NButton,
    NCard,
    NSpace,
    NInputNumber,
  },
  setup() {
    const title = ref("");
    const triggers = ref([]);
    const src = ref("");
    const token = ref(localStorage.token);
    const height = ref(null);
    const width = ref(null);
    const description = ref("");
    const message = useMessage();

    function addPulse() {
      triggers.value.push({
        type: "pulse",
        name: "",
        pulseToSend: "",
      });
    }

    async function createPlugin() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/plugins",
          {
            name: title.value,
            source: src.value,
            isPrivate: false,
            triggers: triggers.value,
            height: height.value,
            width: width.value,
            description: description.value
          },
          {
            headers: {
              authorization: `Bearer ${token.value}`,
            },
          }
        );
        console.log(response);
        router.push({ name: "Plugins" });
      } catch (error) {
        message.error("You cannot create this plugin.");
      }
    }

    return {
      title,
      triggers,
      src,
      addPulse,
      createPlugin,
      token,
      height,
      width,
      description,
    };
  },
};
</script>

<style>
.container {
  width: 100%;
}
h3 {
  margin: 0;
}
</style>
