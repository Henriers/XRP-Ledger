<template>
  <div>
    <h2>Check XRP Account:</h2>
    <input v-model="account" placeholder="XRP Account Address" />
    <button @click="fetchInfo">Fetch Info</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const account = ref('');
const error = ref('');

const emit = defineEmits(['fetch-info']);

const fetchInfo = () => {
  if (account.value) {
    emit('fetch-info', account.value);
    error.value = '';
  } else {
    error.value = 'Please enter a valid account address.';
  }
};
</script>

<style scoped>
.error {
  color: red;
}
h2 {
  font-size: 2em;
  margin: 0;
  color: black;
}
</style>
