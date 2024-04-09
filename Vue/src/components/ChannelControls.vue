<script setup>
const toggleChannelsVisibility = () => {
  const channelItems = document.querySelector('.channel-items');
  if (channelItems.style.display === 'none') {
    channelItems.style.display = 'flex';
  } else {
    channelItems.style.display = 'none';
  }
};

const toggleSearchBarVisibility = () => {
  const searchBar = document.querySelector('.search-bar');
  if (searchBar.style.display === 'none') {
    searchBar.style.display = 'block';
  } else {
    searchBar.style.display = 'none';
  }
};
</script>

<template>
  <div class="channel-controls">
    <button @click="toggleChannelsVisibility">Nascondi Canali</button>
    <button @click="toggleSearchBarVisibility">Nascondi Barra di Ricerca</button>
  </div>
</template>

<style scoped>
.channel-controls button {
  margin-right: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 18px;
}

.channel-controls button:hover {
  background-color: #0056b3;
}
</style>