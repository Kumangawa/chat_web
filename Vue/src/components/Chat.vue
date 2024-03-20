<template>
  <div>
    <Chat :messages="messages" />
  </div>
</template>

<script setup>
import Chat from './components/Chat.vue';

const messages = [
  { text: 'Ciao!', timestamp: '10:00', sentByMe: true },
  { text: 'Ciao! Come stai?', timestamp: '10:01', sentByMe: false },
  { text: 'Bene grazie, tu?', timestamp: '10:02', sentByMe: true },
  { text: 'Anch\'io bene, grazie!', timestamp: '10:03', sentByMe: false },
];
</script>
