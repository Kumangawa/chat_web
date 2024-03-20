<script setup>
import {defineProps,  defineEmits, ref, onMounted } from 'vue'
import Channel from './Channel.vue'
import { store } from '../store/store.js';

const props = defineProps({
  apiLink: String
})

console.log(props.apiLink)

const emit = defineEmits(['channelSelected'])

const channels = ref([])

const selectedChannel = () =>  {
  emit('channelSelected')
}

onMounted(async () => {
  try {
    const response = await fetch(props.apiLink)
    store.apiLink = props.apiLink;
    //store.selectedapiLink= response;
    const data = await response.json()
    channels.value = data.map(channel => ({
      id: channel.id,
      name: channel.name
    }))
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

console.log(channels)

</script>

<template>
  <div>
    <div class="channel-header">Channels</div>
    <div class="channel-items">
    <Channel v-for="channel in channels"
             :channelName="channel.name"
             :channelId="channel.id"
             @channelSelected = "() => selectedChannel()"
    />
    </div>
  </div>
</template>

<style scoped>
.channel-header {
  font-weight: bold;
  margin-bottom: 10px;
}

.channel-items {
  display: flex;
  flex-direction: column; /* Imposta la disposizione verticale */
}

/* Stili per i singoli canali rimossi per brevità */
</style>

