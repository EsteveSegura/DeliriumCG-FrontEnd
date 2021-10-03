<template>
  <div class="container">
    <n-card
      title="Login"
      header-style="background-color: var(--dark-blue);"
      content-style="text-align: center; background-color: var(--dark-blue);"
    >
      <n-space vertical>
        <n-input
          v-model:value="token"
          type="password"
          show-password-on="mousedown"
          placeholder="Token auth"
        />
        <n-button type="primary" size="medium" @click="login">LogIn</n-button>
      </n-space>
    </n-card>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import { NButton, NInput, NCard, NSpace, useMessage } from "naive-ui";

export default {
  name: "Home",
  components: {
    NButton,
    NInput,
    NCard,
    NSpace,
  },
  setup() {
    const token = ref("");
    const id = ref("");
    const message = useMessage();

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
        message.error("The service cannot be accessed with these credentials.");
      }
    }

    return {
      id,
      message,
      token,
      login,
    };
  },
};
</script>

<style scoped>
.container {
  width: 50%;
  display: flex;
  justify-content: center;
}

a,
a:visited {
  text-decoration: none;
  color: var(--white);
  text-decoration: underline;
}
</style>
