<template>
  <div class="container">
    <n-space vertical>
      <n-card
        :title="plugin.name"
        v-for="plugin in data.plugins"
        :key="plugin.id"
        header-style="background-color: var(--dark-blue);"
        content-style="text-align: center; background-color: var(--dark-blue);"
      >
        <template #header-extra>
          <n-popover trigger="hover">
            <template #trigger>
              <a
                :href="
                  'http://localhost:3000/overlay/' +
                    encodeURI(plugin.id) +
                    '?layer-name=' +
                    encodeURI(plugin.name) +
                    `&layer-width=${plugin.width}&layer-height=${plugin.height}`
                "
                >⚾</a
              >
            </template>
            <span>Drag and drop this ball to your OBS </span>
          </n-popover>
        </template>

        <TriggerPulse
          v-for="trigger in plugin.triggers"
          :key="trigger.name"
          :name="trigger.name"
          :pluginId="plugin.id"
        />
      </n-card>
    </n-space>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

import { NCard, NSpace, NPopover } from "naive-ui";
import TriggerPulse from "@/components/TriggerPulse.vue";
export default {
  name: "Plugins",
  components: {
    TriggerPulse,
    NCard,
    NSpace,
    NPopover,
  },
  setup() {
    const id = ref("");
    const data = ref({});
    id.value = localStorage.id;

    onMounted(async () => {
      try {
        const plugins = await axios.get(
          `http://localhost:3000/api/v1/users/${id.value}`
        );
        data.value = plugins.data;
        console.log(plugins);
      } catch (error) {
        console.log(error);
      }
      console.log(data.value);
    });

    return {
      id,
      data,
    };
  },
};
</script>

<style scoped>
a,
a:visited {
  text-decoration: none;
}

.container {
  widows: 100%;
  margin: 0 auto;
}

/*
.grid {
  margin: 1.5em auto;
  column-gap: 1.5em;
  column-count: 4;
}
@media only screen and (min-width: 1024px) {
  .grid {
    column-count: 4;
  }
}

@media only screen and (max-width: 1023px) {
  .grid {
    column-count: 3;
  }
}

@media only screen and (max-width: 767px) {
  .grid {
    column-count: 2;
  }
}

*/
</style>
