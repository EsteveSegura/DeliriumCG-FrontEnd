<template>
  <div class="container">
    <n-card
      title="Login"
      header-style="background-color: var(--dark-blue);"
      content-style="text-align: center; background-color: var(--dark-blue);"
    >
      <n-space vertical>
        <div v-if="!isAuth">
          <n-button type="primary" size="medium" @click="twitchLogin">
            Twitch LogIn
          </n-button>
        </div>
        <div v-else>
          <n-button type="primary" size="medium" @click="logout">
            LogOut
          </n-button>
        </div>
      </n-space>
    </n-card>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
import { NButton, NCard, NSpace, useMessage } from "naive-ui";

export default {
  name: "Home",
  components: {
    NButton,
    NCard,
    NSpace,
  },
  setup() {
    const token = ref("");
    const id = ref("");
    const message = useMessage();
    let isAuth = ref(localStorage.token != null);

    function logout(){
      localStorage.removeItem('id');
      localStorage.removeItem('token');
      isAuth.value = localStorage.token != null;
    }

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

    function twitchLogin() {
      window.open(
        "https://id.twitch.tv/oauth2/authorize?client_id=m4cbkuf3wx1go0wdc2nl9sm7dap8a6&redirect_uri=http://localhost:8080/auth&response_type=token&scope=user:read:email"
      );
    }

    return {
      id,
      message,
      token,
      login,
      twitchLogin,
      isAuth,
      logout
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
