<script setup>
import ChannelList from "./components/ChannelList.vue"
import MessageList from "./components/MessageList.vue"

const apiLink = "https://supsi-ticket.cloudns.org/supsi-chat/bff/channels"
let messageListComponentRef = null // Riferimento al componente MessageList
const handleChannelSelected = () => {
  if (messageListComponentRef) {
    messageListComponentRef.loadData() // Richiama loadData di MessageList
  }
}
</script>

<template>
  <div id="app">
    <div class="container">
      <div class="channel-list">
        <ChannelList :apiLink="apiLink" @channelSelected="handleChannelSelected" />
      </div>
      <div class="message-list">
        <MessageList ref="messageListComponentRef" :apiLink="apiLink" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.channel-header {
  font-weight: bold;
  margin-bottom: 10px;
}

.channel-list {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px; /* Aggiunge uno spazio tra i due elenchi */
}

.message-list {
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>

