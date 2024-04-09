<script setup>
import Stomp from 'stompjs';
import { store } from '../store/store.js';
import ChannelList from "./ChannelList.vue"
import MessageList from "./MessageList.vue"
import SearchBar from "./SearchBar.vue"
import ChannelControls from './ChannelControls.vue';
import Toast from "./Toast.vue";
import { ref, defineProps, onMounted, onUnmounted } from "vue";

const props = defineProps({ userName: String })

onMounted(() => {
  console.log("props.userName: ", props.userName);
  store.userName = props.userName;
});

const apiLink = "https://supsi-ticket.cloudns.org/supsi-chat/bff/channels"
let messageListComponentRef = null
let channelName = '';
const brokerURL = 'wss://supsi-ticket.cloudns.org/supsi-chat/supsi-chat-websocket';
const client = Stomp.client(brokerURL);
const showToastt = ref(false);
const toastMessage = ref("");
const toastVariant = ref("");


const handleChannelSelected = () => {
  if (messageListComponentRef) {
    messageListComponentRef.loadData()
  }
}

const handleSearch = () => {
  if (messageListComponentRef) {
    messageListComponentRef.handleSearch()
  }
}

// Funzione di callback per la connessione al server WebSocket
const connectCallback = () => {
  console.log('Connesso al server WebSocket');
  client.reconnect_delay = 5000;
  client.subscribe('/app/' + store.apiKey + '/new-message', messageCallback);
  client.subscribe('/app/' + store.apiKey + '/update-message', updateCallback);
};

const messageCallback = (message) => {
  console.log('Nuovo messaggio ricevuto:', message.body);

  const jsonData = JSON.parse(message.body);

  console.log(jsonData);
  if (store.channelId === jsonData.channel) {
    messageListComponentRef.waitLoadData(store.channelId);
  } else {
    console.log(jsonData.channel)
    store.channelId = jsonData.channel;
    channelName = document.getElementById(jsonData.channel).innerHTML;
    showToast(jsonData.body, 'info');
  }
};

// Metodo per mostrare il toast
const showToast = (message, variant) => {
  toastMessage.value =  channelName + " " + message;
  toastVariant.value = variant;
  showToastt.value = (store.selectedChannelName.toString() !== channelName.toString());
  setTimeout(() => {
    showToastt.value = false;
  }, 5000);
};

const updateCallback = (message) => {
  console.log('Messaggio modificato ricevuto:', message.body);
  messageListComponentRef.waitLoadData(store.channelId);
};

client.connect({}, connectCallback, (error) => {
  console.error('Errore durante la connessione al server WebSocket:', error);
});

// Funzione per effettuare la disconnessione dal server WebSocket
const disconnectWebSocket = () => {
  if (client && client.connected) {
    client.disconnect();
    console.log('Disconnesso dal server WebSocket');
  }
};

// Chiama la funzione di disconnessione quando il componente viene smontato
onUnmounted(disconnectWebSocket);
</script>

<template>
  <div class="container">
    <div class="channel-list">
      <ChannelList :apiLink="apiLink" @channelSelected="handleChannelSelected" />
      <ChannelControls />
    </div>
    <div class="message-list" >
      <div class="search-bar">
        <SearchBar :onSearch="handleSearch" />
      </div>
      <MessageList ref="messageListComponentRef" :apiLink="apiLink" />
    </div>
    <Toast
        :message="toastMessage"
        :variant="toastVariant"
        v-if="showToastt"
    />
    </div>
</template>

