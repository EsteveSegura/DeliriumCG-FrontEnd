<template>
  <div class="container">
    <div class="component" v-for="plugin in plugins" :key="plugin.id">
      {{ plugin.name }} <br />
      <Button
        :displayText="'Add ' + plugin.name"
        :actionName="plugin.id"
        @action="addPlugin"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import Button from "@/components/Common/Button";
export default {
  name: "Store",
  components: {
    Button,
  },
  setup() {
    let plugins = ref({});
    let token = ref(localStorage.token);

    onMounted(async () => {
      await getPlugins();
    });

    async function addPlugin(value) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/v1/plugins/${value}/transfer`,
          null,
          {
            headers: {
              authorization: `Bearer ${token.value}`,
            },
          }
        );
        console.log(response)
      } catch (error) {
        alert("fail: " + error);
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
        alert("fail");
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
