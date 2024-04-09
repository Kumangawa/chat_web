<script setup>
import { defineProps, onMounted, defineEmits, ref, watch  } from 'vue'
import { store } from '../store/store.js';

const props = defineProps({
  channelName : String,
  channelId : Number
})


const emit = defineEmits(['channelSelected'])

const isSelected = ref(false)

const setChannel = async () => {
  store.selectedChannelName = props.channelName;
  store.selectedChannelId = props.channelId;
  isSelected.value = true
  emit('channelSelected')
};

watch(() => store.selectedChannelId, () => {
  isSelected.value = store.selectedChannelId === props.channelId
})

onMounted(() => {
  isSelected.value = store.selectedChannelId === props.channelId;
});

</script>
<template>
  <button :id="channelId" @click="setChannel" :class="{ 'selected-channel': isSelected, 'unselected-channel': !isSelected  }"> {{ channelName }} </button>
</template>
<style scoped>

.selected-channel {
  background-color: #3a68ca;
}

.unselected-channel {
  background-color: #9d9c9c;
}
</style>
