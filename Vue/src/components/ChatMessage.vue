<template>
  <div class="chat">
    <div v-for="(message, index) in messages" :key="index" class="message">
      <ChatMessage :message="message" />
    </div>
  </div>
</template>

<script>
import ChatMessage from './ChatMessage.vue';

export default {
  components: {
    ChatMessage,
  },
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
};
</script>

<!-- ChatMessage.vue -->
<template>
  <div :class="{ 'sent': message.sentByMe, 'received': !message.sentByMe }">
    <p>{{ message.text }}</p>
    <span>{{ message.timestamp }}</span>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.sent {
  background-color: #e2f7cb;
  text-align: right;
}
.received {
  background-color: #ffffff;
  text-align: left;
}
</style>
