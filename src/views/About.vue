<template>
  <div class="about">
    <h1>{{ id }}</h1>
    <div v-for="plugin in data.plugins" :key="plugin.id" >
      url http://localhost:3000/overlay/{{plugin.id}}
      <h2>{{plugin.name}}</h2>
      <TriggerPulse v-for="trigger in plugin.triggers" :key="trigger.name" :name="trigger.name" :pluginId="plugin.id" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import TriggerPulse from "@/components/TriggerPulse.vue"
export default {
  name: "HelloWorld",
  components:{
    TriggerPulse
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
        data.value = plugins.data
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
