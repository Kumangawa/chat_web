<script setup>
import {ref} from 'vue'
import { store } from '../store/store.js';

const props = defineProps({
  messageId : String,
  parentMessageId : String,
  body : String,
  author : String,
  date : String,
  lastEditedDate : String,
  attachment : Object,
  apiLink : String,
  isEdited : Boolean
})

let message = {
  messageId : props.messageId,
  parentMessageId : props.parentMessageId,
  body : props.body,
  author : props.author,
  date : props.date,
  lastEditedDate : props.lastEditedDate,
  attachment : props.attachment,
  apiLink : props.apiLink,
  isEdited: props.isEdited
};


const formattedDate = ref(formatDate(props.date))
const attachmentName = ref(getAttachmentName(props.attachment));
const emit = defineEmits(['messageClick'])
const isCurrentUserAuthor = ref(props.author === store.userName);

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', options);
}

console.log(props)

const handleClick = () => {
  console.log('From the son'+ message );
  emit('messageClick', message)
}
const handleEdit = () => {
  console.log('Edit message clicked'+ message );
  emit('editMessageClick', message.messageId, message.body )
}

const handleReply = () => {
  console.log('Reply to message clicked' + message );
  emit('replyMessageClick', message.messageId)
}

const handleClickAttachment= () => {
  window.open(props.attachment.url, '_blank');
}

function getAttachmentName(attachment) {
  if (!attachment) return '';
  return attachment.title.toString();
}

const handleParentMessageLinkClick = () => {
  if (props.parentMessageId) {
    console.log("handleParentMessageLinkClick pressed")
    emit('parentMessageLinkClick', props.parentMessageId);
  }
};

</script>

<template>
  <div class="message" :id="messageId" @click="handleClick">

    <div class="message-header">
      <div class="author">{{ author }}</div>
      <div class="message-date">{{ formattedDate }}</div>
    </div>
    <a v-if="parentMessageId" @click="handleParentMessageLinkClick" class="parent-message-link">Replying from ...</a>
    <div class="message-content">{{ body }}</div>
     <a @click="handleClickAttachment" class="message-attachment" v-if="attachment" :href="attachment" target="_blank">{{ attachmentName }}</a>
    <div class="message-options">
      <span class="edit-option" v-if="isCurrentUserAuthor" @click="handleEdit">Edit</span>
      <span class="reply-option" v-if="!isCurrentUserAuthor" @click="handleReply">Reply</span>
    </div>
  </div>
</template>

<style scoped>
.message {
  font-size: 24px;
  position: relative;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  text-align: left;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.author {
  font-weight: bold;
}

.message-date {
  color: #777;
}

.message-content {
  margin-bottom: 5px;
}

.message-options {
  position: absolute;
  bottom: 5px;
  right: 5px;
}

.edit-option,
.reply-option {
  margin-left: 10px;
  cursor: pointer;
  color: blue;
}

.message-attachment {
  color: blue;
  margin-top: 5px;
  cursor: pointer;
  text-decoration: underline;
}
</style>
