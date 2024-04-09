<script>
  export default {
  props: {
  message: String,
  variant: { type: String, default: "info"}
},
  data() {
  return {
  show: true
};
},
  mounted() {
  // Nascondi il toast dopo 5 secondi
  setTimeout(() => {
  this.show = false;
}, 5000);
}
};
</script>
<template>
  <div class="toast" :class="variant">
    {{ message }}
  </div>
</template>
<style scoped>
.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 1000;
}
</style>
