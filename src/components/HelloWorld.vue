<template>
  <form @submit.prevent="update">
    <label for="token">Token:</label>
    <input type="text" required v-model="token" />
    {{ token }}

    <button type="submit">submit</button>
  </form>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import router from "@/router";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  setup() {
    const token = ref("");

    async function update() {
      try {
        const authRoute = await axios.post(
          "http://localhost:3000/api/v1/users/auth",
          null,
          {
            headers: {
              authorization: `Bearer ${token.value}`
            },
          }
        );
        localStorage.id = authRoute.data.id;
        localStorage.token = token.value;
        console.log(authRoute);
        router.push({ name: "Plugins" });
      } catch (error) {
        alert("fail")
        console.log(error)        
      }
    }

    return {
      token,
      update,
    };
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
