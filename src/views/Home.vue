<template>
  <div class="home">
    <div class="login" >
      {{token}}
      <InputText v-model="token" />
      <Button displayText="OK" actionName="login" @action="login" />
    </div>
    <!-- <div v-else>
      <h1>You already logged</h1>
      Go to 👉 <router-link to="/plugins">Plugins</router-link>
    </div> -->
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import router from "@/router";

import InputText from "@/components/Common/InputText.vue";
import Button from "@/components/Common/Button.vue";

export default {
  name: "Home",
  components: {
    InputText,
    Button,
  },
  setup() {
    const token = ref("");
    const id = ref("");

    async function login() {
      try {
        const authRoute = await axios.post(
          "http://localhost:3000/api/v1/users/auth",
          null,
          {
            headers: {
              authorization: `Bearer ${token.value}`,
            },
          }
        );
        localStorage.id = authRoute.data.id;
        localStorage.token = token.value;
        router.push({ name: "Plugins" });
      } catch (error) {
        alert("fail");
      }
    }

    return {
      id,
      token,
      login,
    };
  },
};
</script>

<style scoped>
a, a:visited{
  text-decoration: none;
  color: var(--white);
  text-decoration: underline;
}
</style>