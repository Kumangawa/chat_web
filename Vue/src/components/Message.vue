<script setup>
import { ref } from 'vue'

const props = defineProps({
  messageId : String,
  parentMessageId : String,
  body : String,
  author : String,
  date : String,
  lastEditedDate : String,
  attachment : String,
  apiLink : String
})

let message = {
  messageId : props.messageId,
  parentMessageId : props.parentMessageId,
  body : props.body,
  author : props.author,
  date : props.date,
  lastEditedDate : props.lastEditedDate,
  attachment : props.attachment,
  apiLink : props.apiLink
};

console.log(props)

const emit = defineEmits(['messageClick'])

const handleClick = () => {
  console.log("Clicking on message "+message  )
  emit('messageClick', message)
}

</script>

<template>
  <div class="message" @click="handleClick()" v-bind:id=messageId >
    <div class="author">{{ author }}</div>
    <div class="message-content">{{ body }}</div>
  </div>
</template>

<style scoped>
.message {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  text-align: left; /* Allinea il testo a sinistra */
}

.author {
  font-weight: bold;
  margin-bottom: 5px;
}
</style>


