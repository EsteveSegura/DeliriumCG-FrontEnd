<template>
    {{name}}
    <button @click="triggerPulse">submit</button>
    
</template>

<script>
import { ref } from "vue";
import axios from "axios";
export default {
  name: "HelloWorld",
  props: {
    pluginId: String,
    name: String,
  },
  setup(props) {
    const token = ref("");
    console.log(props.name)
    console.log(localStorage.token)
    async function triggerPulse() {
      try {
        const authRoute = await axios.post(
          `http://localhost:3000/api/v1/plugins/${props.pluginId}/trigger/pulse`,
          {"name": props.name},
          {
            headers: {
              authorization: `Bearer ${localStorage.token}`
            },
          }
        );
        localStorage.id = authRoute.data.id;
        console.log(authRoute);
      } catch (error) {
        console.log(error)        
      }
    }

    return {
      token,
      triggerPulse
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
