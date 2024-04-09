<script setup>
import {defineProps, ref, onMounted, defineExpose} from 'vue'
import Message from './Message.vue'
import MessageInput from './MessageInput.vue'
import { store } from '../store/store.js'

const props = defineProps({
  apiLink: String
})

let messageInputRef = null;
const messages = ref([])
const replyMessageId = ref('')
const editedMessageId = ref('')
const filteredMessages = ref([])

const waitLoadData = async (channelId) => {
  try {
    const response = await fetch(`${props.apiLink}/${channelId}/messages?apiKey=${store.apiKey}`);
    if (!response.ok) {
      throw new Error('Errore durante il recupero dei messaggi');
    }
    const data = await response.json();
    messages.value = data.map(message => ({
      id : message.id,
      parentMessageId: message.parentMessageId,
      body: message.body,
      author: message.author,
      date: message.date,
      lastEditTime: message.lastEditTime,
      channelId: message.channelId,
      attachment: message.attachment
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
  } catch (error) {
    console.error('Errore durante il recupero dei messaggi:', error);
  }
  filteredMessages.value = messages.value
};

const loadData =async () => {
  const api = `${props.apiLink}/${store.selectedChannelId}/messages?apiKey=${store.apiKey}`;
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
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
  } catch (error) {
    console.error('Error fetching data:', error)
  }
  filteredMessages.value = messages.value
}
const createMessage = async (newMessageBody, fileAttachment) => {
  const newMessage = {
    body: newMessageBody.value,
    author: store.userName
  }
  if (replyMessageId.value) {
    newMessage.parentMessageId = replyMessageId.value;
  }

  const formData = new FormData();
  formData.append('message',new Blob([JSON.stringify(newMessage)], {type: 'application/json'}));
  formData.append('attachment', fileAttachment.value ? fileAttachment.value : new Blob());

  try {
    const response = await fetch(`${props.apiLink}/${store.selectedChannelId}/messages?apiKey=${store.apiKey}`, {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      loadData();
      replyMessageId.value = '';
      document.getElementById('fileInput').value = '';

      if (messageInputRef) {
        messageInputRef.clearMessageInput()
      }
    } else {
      console.error('Error creating new message:', response.statusText)
    }
  } catch (error) {
    console.error('Error creating new message:', error)
  }
}
const handleSearch = () => {
  if (!store.searchMessage.trim() || store.searchMessage === '') {
    filteredMessages.value = messages.value
  } else {
    filteredMessages.value = messages.value.filter(message => message.body.includes(store.searchMessage.trim()) || message.author.includes(store.searchMessage.trim())
    )
  }
}
function handleMessage(value){
  console.log('From the child:', value);
}
function handleReplyMessage(messageId) {
  replyMessageId.value = messageId
}
function handleEditMessage(messageId, body) {
  editedMessageId.value = messageId;
  store.newMessageBody = body;
  if (messageInputRef) {
    messageInputRef.handleEditData()
  }
}
const editMessage = async (newMessageBody) => {
  try {
    const response = await fetch(`https://supsi-ticket.cloudns.org/supsi-chat/bff/messages/${editedMessageId.value}/body?apiKey=${store.apiKey}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ body: newMessageBody.value })
    });

    if (response.ok) {
      let messageIndex = messages.value.findIndex(message => message.id === editedMessageId.value);
      if (messageIndex !== -1) {
        messages.value[messageIndex].body = newMessageBody.value;
        messages.value[messageIndex].isEdited = true;
        messages.value[messageIndex].lastEditTime = Date.now().toString();
      }
      editedMessageId.value = '';

      if (messageInputRef) {
        messageInputRef.clearMessageInput()
      }
    } else {
      console.error('Error updating message:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating message:', error);
  }
};
function handleParentMessageLinkClick(parentId) {
  console.log("handleParentMessageLinkClick cliccato ")
  const parentMessage = messages.value.find(message => message.id === parentId);

  if (parentMessage) {
    console.log("parentMessage non e' null ")
    const parentMessageElement = document.getElementById(parentMessage.id);

    if (parentMessageElement) {
      parentMessageElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
function getMessageWidth(length) {
  return 700 + Math.min(length * 4, window.innerWidth * 0.6) + 'px';
}

onMounted(() => {
  store.apiKey = "saporito"
  loadData()

})

defineExpose({
  loadData,
  handleSearch,
  waitLoadData
})

</script>

<template>
  <div class="message-container">
    <ul class="message-list">
      <li v-for="message in filteredMessages" :key="message.id">
        <div :class="{ 'message-right': message.author === store.userName }">
          <Message
              :messageId="message.id"
              :parentMessageId="message.parentMessageId"
              :body="message.body"
              :author="message.author"
              :date="message.date"
              :lastEditedDate="message.lastEditTime"
              :isEdited=false
              :attachment="message.attachment"
              @messageClick="(i) => handleMessage(i)"
              @editMessageClick="(messageId, body) => handleEditMessage(messageId, body)"
              @replyMessageClick="(messageId) => handleReplyMessage(messageId)"
              @parentMessageLinkClick="(parentId) => handleParentMessageLinkClick(parentId)"
              :style="{ width: getMessageWidth(message.body.length) }"
          />
        </div>
      </li>
    </ul>
  </div>
  <MessageInput ref="messageInputRef"
                @create-message="createMessage"
                @edit-message="editMessage"/>
</template>

<style scoped>

.message-container {
  max-height: 90%;
  position: relative;
  overflow-y: auto;
}

.message-list {
  list-style-type: none;
  padding-left: 0;
}

.message-list li {
  margin-bottom: 10px;
}

.message-right {
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
}

.message {
  width: auto;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  text-align: left;
  align-self: flex-end;

}

textarea {
  flex: 1;
  margin-right: 10px;
}

button {
  cursor: pointer;
}


</style>


