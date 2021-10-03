<template>
  <div class="container">
    <n-spin size="large" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import axios from "axios";

import { NSpin, useMessage } from "naive-ui";
export default {
  name: "Plugins",
  components: {
    NSpin
  },
  setup() {
    const route = useRoute();
    const id = ref("");
    const data = ref({});
    const message = useMessage();
    const access_token = ref(
      route.hash.split("access_token=")[1].split("&")[0]
    );
    id.value = localStorage.id;

    onMounted(async () => {
      try {
        const auth = await axios.post(`http://localhost:3000/api/v1/users/`, {
          twitchToken: access_token.value,
        });
        data.value = auth.data;

        localStorage.id = auth.data.id;
        localStorage.token = auth.data.token;
        router.push({ name: "Plugins" });
      } catch (error) {
        message.error(
          "The service cannot be accessed with these twitch credentials."
        );
      }
      console.log(data.value);
    });

    return {
      id,
      access_token,
      data,
    };
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  margin: 0 auto;
}
</style>
