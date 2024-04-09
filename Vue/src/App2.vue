<script>
import Chat from "./components/Chat.vue"
export default {
  components: {
    Chat2: Chat
  }
}
</script>

<script setup>
const secondUser = "Paolo Aquino";
</script>

<template>
  <div id="app2">
    <Chat2 :userName="secondUser" />
  </div>
</template>