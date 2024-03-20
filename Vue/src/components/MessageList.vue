<script setup>
import {defineProps, ref, onMounted, defineExpose} from 'vue'
import Message from './Message.vue'
import { store } from '../store/store.js'

const props = defineProps({
  apiLink: String
})

const messages = ref([])
const newMessageBody = ref('')

const loadData =async () => {
  const api = `${props.apiLink}/${store.selectedChannelId}/messages?apiKey=saporito`;
  console.log(api)
  console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaaaa")
  try {
    const response = await fetch(api)
    const data = await response.json()
    messages.value = data.map(message => ({
      id : message.id,
      parentMessageId: message.parentMessageId,
      body: message.body,
      author: message.author,
      date: message.date,
      lastEditTime: message.lastEditTime,
      channelId: message.channelId,
      attachment: message.attachment
    }))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
onMounted(() => {
  loadData()
})
console.log(messages)

const createMessage = async () => {
  const newMessage = {
    body: newMessageBody.value,
    author: 'Francesco'
    /*
    id : 11111111,
    parentMessageId: 22222222,
    body: newMessageBody.value,
    author: store.userName,
    date: date,
    lastEditTime: date,
    channelId: store.selectedChannelId,
    attachment: message.attachment

     */
  }
  const formData = new FormData();
  formData.append('message', JSON.stringify(newMessage));
  formData.append('attachment', fileInput.files[0]);

  try {
    const response = await fetch(`${props.apiLink}/${store.selectedChannelId}/messages?apiKey=saporito`, {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      // Se la richiesta è andata a buon fine, aggiorna la lista dei messaggi
      loadData()
      // Svuota il campo di input del nuovo messaggio
      newMessageBody.value = ''
    } else {
      console.error('Error creating new message:', response.statusText)
    }
  } catch (error) {
    console.error('Error creating new message:', error)
  }
}

const handleMessage = (value) => {
  console.log('From the child:', value);
};

defineExpose({
  loadData
})

</script>

<template>
  <ul class="message-list" v-for="message in messages">
    <li :key="message.id">
      <Message
          :messageId="message.id"
          :parentMessageId="message.parentMessageId"
          :body="message.body"
          :author="message.author"
          :date="message.date"
          :lastEditedDate="message.lastEditTime"
          :attachment="message.attachment"

          @messageClick="(i) => handleMessage(i)"
      />
    </li>
  </ul>
  <div class="message-input">
    <textarea v-model="newMessageBody" placeholder="Inserisci il testo del messaggio"></textarea>
    <button @click="createMessage">Invia messaggio</button>
  </div>
</template>

<style scoped>
.message-list {
  list-style-type: none; /* Rimuove i puntini a sinistra */
  padding-left: 0; /* Rimuove il padding sinistro */
  width: 60%; /* Imposta la larghezza al 30% dell'area totale */
}

.message-list li {
  margin-bottom: 10px; /* Aggiunge uno spazio tra i messaggi */
}

.message-input {
  display: flex;
  margin-top: 10px;
}

textarea {
  flex: 1;
  margin-right: 10px;
}

button {
  cursor: pointer;
}
</style>