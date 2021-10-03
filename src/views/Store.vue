<template>
  <div class="container">
    <n-card
      :title="plugin.name"
      v-for="plugin in plugins"
      :key="plugin.id"
      header-style="background-color: var(--dark-blue);"
      content-style="text-align: center; background-color: var(--dark-blue);"
    >
      <n-space vertical>
        <n-button type="primary" size="medium" @click="addPlugin(plugin.id)">
          Add {{ plugin.name }}
        </n-button>
      </n-space>
    </n-card>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { NButton, useMessage, NCard, NSpace } from "naive-ui";

import axios from "axios";
export default {
  name: "Store",
  components: {
    NButton,
    NCard,
    NSpace,
  },
  setup() {
    let plugins = ref({});
    let token = ref(localStorage.token);
    const message = useMessage();

    onMounted(async () => {
      await getPlugins();
    });

    async function addPlugin(value) {
      try {
        await axios.put(
          `http://localhost:3000/api/v1/plugins/${value}/transfer`,
          null,
          {
            headers: {
              authorization: `Bearer ${token.value}`,
            },
          }
        );
        message.success("Plugin added to your list, you can use it now!");
      } catch (error) {
        message.error("You cannot add this plugin to your list.");
      }
    }

    async function getPlugins() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/plugins",
          {
            headers: {
              authorization: `Bearer ${token.value}`,
            },
          }
        );
        plugins.value = response.data.plugins;
      } catch (error) {
        console.log(error);
      }
    }

    return {
      plugins,
      getPlugins,
      addPlugin,
      token,
    };
  },
};
</script>

<style>
.container {
  width: 24%;
  margin: 0 auto;
}
.component {
  background-color: var(--dark-blue);
  margin-bottom: 1rem;
  display: block;
  border-radius: 10px;
  padding: 1rem;
  width: 100%;
}
</style>
