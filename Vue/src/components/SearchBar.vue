<script setup>
import { defineProps, ref } from 'vue'
import { store } from '../store/store.js'

const props = defineProps(['onSearch'])
const searchText = ref('')

const handleSearch = () => {
  store.searchMessage = searchText.value
  props.onSearch()
}
</script>

<template>
  <div class="search-bar">
    <input type="text" v-model="searchText" placeholder="Cerca messaggi per contenuto o autore" @input="handleSearch">
  </div>
</template>

<style scoped>
.search-bar {
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: flex-end;
}

input[type="text"] {
  width: 100%;
  padding: 20px;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 20px;
}
</style>