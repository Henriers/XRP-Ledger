<template>
  <div id="app">
    <h1>XRP Account Viewer</h1>
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
#app {
  text-align: center;
  margin: 20px;
}
</style>
