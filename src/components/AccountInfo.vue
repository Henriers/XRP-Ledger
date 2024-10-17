<template>
  <div>
    <h2>Account Information</h2>
    <div v-if="accountData">
      <p>Address: {{ accountData.account }}</p>
      <p>Balance: {{ accountData.balance }} XRP</p>
      <h3>Transaction History</h3>
      <ul v-if="transactions.length > 0">
        <li v-for="tx in transactions" :key="tx.hash">
          Transaction Type: {{ tx.tx_json.TransactionType }} <br />
          Amount:
          {{ tx.tx_json.LimitAmount ? (tx.tx_json.LimitAmount.value + " " + tx.tx_json.LimitAmount.currency || 'XRP') : (tx.tx_json.DeliverMax / 1000000) + ' XRP' }}<br />
          Fee: {{ (tx.tx_json.Fee / 1000000 ) }} XRP <br />
          Hash: {{ tx.hash }} <br />
          Close Time: {{ tx.close_time_iso.toLocaleDateString() }} <br />

        </li>
      </ul>
      <p v-else>No transactions available.</p>
    </div>
    <p v-else-if="loading">Loading...</p>
    <p v-else>If you enter an address, account information will be displayed here.</p>
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
h2 {
  margin-bottom: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-bottom: 15px;
  border: 1px;
  background-color: white;
  color: black
}
</style>
