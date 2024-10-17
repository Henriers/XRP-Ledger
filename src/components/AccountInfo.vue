<template>
  <div class="account-info">
    <h2>Account Information</h2>
    <div v-if="accountData" class="account-details">
      <p>Address: {{ accountData.account }}</p>
      <p>Balance: {{ accountData.balance.toFixed(2) }} XRP</p>
      <h3>Transaction History</h3>
      <ul v-if="transactions.length > 0" class="transaction-list">
        <li v-for="tx in transactions" :key="tx.hash" class="transaction-item">
          <div>Transaction Type: {{ tx.tx_json.TransactionType }}</div>
          <div>
            Amount:
            {{ tx.tx_json.LimitAmount 
              ? (tx.tx_json.LimitAmount.value + " " + tx.tx_json.LimitAmount.currency) 
              : (tx.tx_json.DeliverMax / 1000000) + ' XRP' }}
          </div>
          <div>Fee: {{ (tx.tx_json.Fee / 1000000).toFixed(6) }} XRP</div>
          <div>Hash: {{ tx.hash }}</div>
          <div>Close Time: {{ new Date(tx.close_time_iso).toLocaleString() }}</div>
        </li>
      </ul>
      <p v-else>No transactions available.</p>
    </div>
    <p v-else-if="loading">Loading...</p>
    <p v-else class="placeholder">If you enter an address, account information will be displayed here.</p>
  </div>
</template>



<script setup lang="ts">

const props = defineProps<{
  accountData: {
    account: string;
    balance: number;
  } | null;

  transactions: {
    close_time_iso: string;
    hash: string;
    ledger_index: number;
    tx_json: {
      DeliverMax?: string;
      Fee: number;
      TransactionType: string;
      LimitAmount?: {
        currency: string;
        issuer: string;
        value: number;
      }
    };
  }[];
  loading: boolean;
}>();

</script>

<style scoped>
.account-info {
  font-family: Arial, sans-serif;
  color: #333;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 15px;
  font-size: 24px;
}

.account-details {
  margin-bottom: 20px;
}

.transaction-list {
  list-style-type: none;
  padding: 0;
  text-overflow: ellipsis;
}

.transaction-item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: #fff;
  margin-bottom: 10px;
  transition: background-color 0.3s;
}
</style>

