<template>
  <div class="account-info">
    <h2>Account Information</h2>
    <div v-if="accountData" class="account-details">
      <p>Address: {{ accountData.account }}</p>
      <p>Balance: {{ accountData.balance.toFixed(2) }} XRP</p>
      <h3>Transaction History</h3>
      <table v-if="transactions.length > 0" class="transaction-table">
        <thead>
          <tr>
            <th>Transaction Type</th>
            <th>Amount</th>
            <th>Fee</th>
            <th>Hash</th>
            <th>Close Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tx in transactions" :key="tx.hash" class="transaction-item">
            <td>{{ tx.tx_json.TransactionType }}</td>
            <td>
              {{ tx.tx_json.LimitAmount 
                ? (tx.tx_json.LimitAmount.value + " " + tx.tx_json.LimitAmount.currency) 
                : (tx.tx_json.DeliverMax / 1000000) + ' XRP' }}
            </td>
            <td>{{ (tx.tx_json.Fee / 1000000).toFixed(6) }} XRP</td>
            <td>{{ tx.hash }}</td>
            <td>{{ new Date(tx.close_time_iso).toLocaleString() }}</td>
          </tr>
        </tbody>
      </table>
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
.transaction-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.transaction-table th, .transaction-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.transaction-table th {
  background-color: #f2f2f2;
}

</style>

