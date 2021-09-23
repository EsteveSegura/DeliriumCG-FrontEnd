<template>
  <div class="grid">
    <div class="plugin" v-for="plugin in data.plugins" :key="plugin.id">
      <h2>{{ plugin.name }}</h2>
      <a :href="'http://localhost:3000/overlay/' + encodeURI(plugin.id) +'?layer-name='+ encodeURI(plugin.name) +'&layer-width=1280&layer-height=1080'">⚾</a><br />
      <br />
      <TriggerPulse
        v-for="trigger in plugin.triggers"
        :key="trigger.name"
        :name="trigger.name"
        :pluginId="plugin.id"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

import TriggerPulse from "@/components/TriggerPulse.vue";
export default {
  name: "Plugins",
  components: {
    TriggerPulse,
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
a, a:visited{
  text-decoration: none;
}

.grid {
  margin: 1.5em auto;
  column-gap: 1.5em;
  column-count: 4;
}
.plugin {
  background-color: var(--dark-blue);
  display: inline-block;
  margin: 1rem 1rem 0rem 1rem;
  border-radius: 15px;
  width: 100%;
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

@media only screen and (max-width: 767px)  {
  .grid {
    column-count: 2;
  }
}

</style>