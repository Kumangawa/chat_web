<script setup>
import { ref, defineEmits } from 'vue'
import { store } from '../store/store.js'

const emits = defineEmits(['create-message', 'edit-message']);
const newMessageBody = ref('')
const fileAttachment = ref(null)
const actionState = ref('create')

const handleFileChange = (event) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    const file = files[0];
    if (file instanceof File) {
      fileAttachment.value = file;
    } else {
      console.error('Invalid file selected');
      fileAttachment.value = null;
    }
  } else {
    fileAttachment.value = null;
  }
}

const clearMessageInput = () => {
  newMessageBody.value = '';
  fileAttachment.value = null;
}

const handleClick = () => {
  if (actionState.value === 'create') {
    emits('create-message', newMessageBody, fileAttachment);
  } else {
    emits('edit-message', newMessageBody);
    actionState.value = 'create';
  }
};

const handleEditData = () => {
  newMessageBody.value = store.newMessageBody;
  actionState.value = 'edit';
};

defineExpose({
  handleEditData,
  clearMessageInput
});

</script>

<template>
  <div class="message-input">
    <textarea v-model="newMessageBody" placeholder="Inserisci il testo del messaggio"></textarea>
    <input type="file" id="fileInput"  ref="fileInput" @change="handleFileChange">
    <button @click="handleClick"> {{ actionState === 'create' ? 'Invia messaggio' : 'Salva' }} </button>
  </div>
</template>

<style scoped>
.message-input {
  position: sticky;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

textarea {
  font-size: 24px;
  flex: 1;
  margin-right: 10px;
  height: 100px;
}


button {
  cursor: pointer;
  height: 100px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>


