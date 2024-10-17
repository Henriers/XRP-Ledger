<template>
  <div>
    <h2>Enter XRP Account Address</h2>
    <input v-model="account" placeholder="XRP Account Address" />
    <button @click="fetchAccountInfo">Fetch Info</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const account = ref('');
const error = ref('');

const emit = defineEmits(['fetch-account-info']);

const fetchAccountInfo = () => {
  if (account.value) {
    emit('fetch-account-info', account.value);
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
</style>
