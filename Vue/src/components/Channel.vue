<script setup>
import { defineProps, defineEmits  } from 'vue'
import { store } from '../store/store.js';

const props = defineProps({
  channelName : String,
  channelId : Number
})

console.log(props)

const emit = defineEmits(['channelSelected'])

const setChannel = async () => {
  store.selectedChannelName = props.channelName;
  store.selectedChannelId = props.channelId;
  emit('channelSelected')
};

</script>
<template>
  <button :id="channelId" @click="setChannel"> {{ channelName }} </button>
</template>