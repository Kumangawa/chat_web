
<script setup>
import { ref } from 'vue';

const url = 'https://supsi-ticket.cloudns.org/supsi-chat/bff/';
const search = false;
const channels = true;

const onMessageClick = (message) => {
  alert(message.author);
};
</script>

<template>

</template>

<style scoped>

</style>