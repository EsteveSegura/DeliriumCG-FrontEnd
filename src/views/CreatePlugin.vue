<template>
  <h1>Create Plugin</h1>
  <h3>Title</h3>
  <InputText v-model="title" /> <br />
  <h3>Src</h3>
  <InputTextArea v-model="src" /> <br />
  <Button
    displayText="Add Pulse Trigger"
    actionName="AddPulseTrigger"
    @action="addPulse"
  />
  <br />
  <div v-for="trigger in triggers" class="" :key="trigger">
    <h3>Pulse Title</h3>
    <InputText v-model="trigger.name" /> <br />
    <h3>Pulse to send</h3>
    <InputText v-model="trigger.pulseToSend" /> <br />
  </div>
  <Button displayText="Create" actionName="createPlugin" @action="createPlugin" /> <br />

</template>

<script>
import { ref } from "vue";
import axios from "axios";
import router from "@/router";

import InputText from "@/components/Common/InputText";
import InputTextArea from "@/components/Common/InputTextArea";
import Button from "@/components/Common/Button";

export default {
  name: "CreatePlugin",
  components: {
    InputText,
    InputTextArea,
    Button,
  },
  setup() {
    const title = ref("");
    const triggers = ref([]);
    const src = ref("");
    const token = ref(localStorage.token);

    function addPulse() {
      triggers.value.push({
        type: "pulse",
        name: "",
        pulseToSend: "",
      });
    }

    async function createPlugin() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/plugins",
          {
            name: title.value,
            source: src.value,
            isPrivate: false,
            triggers: triggers.value,
          },
          {
            headers: {
              authorization: `Bearer ${token.value}`,
            },
          }
        );
        console.log(response)
        router.push({ name: "Plugins" });
      } catch (error) {
        alert("fail");
      }
    }

    return {
      title,
      triggers,
      src,
      addPulse,
      createPlugin,
      token,
    };
  },
};
</script>

<style>
h3 {
  margin: 0;
}
</style>
