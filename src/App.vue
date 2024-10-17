<template>
  <div class="app-container">
    <h1 class="title">XRP Account Viewer</h1>
    <AccountInput @fetch-account-info="getAccountInfo" />
    <AccountInfo 
      :accountData="accountData" 
      :transactions="transactions" 
      :loading="loading" 
    />
  </div>
</template>

<script setup lang="ts">
import { useXrpAccount } from './composables/useXrpAccount';
import AccountInput from './components/AccountInput.vue';
import AccountInfo from './components/AccountInfo.vue';

const { accountData, transactions, loading, getAccountInfo } = useXrpAccount();
</script>

<style>
body {
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  color: black;
  margin-bottom: 20px;
  font-size: 28px;
  text-align: center;
}

h1 {
  font-size: 2em;
  margin: 0;
}

p {
  margin: 10px 0;
}
</style>
