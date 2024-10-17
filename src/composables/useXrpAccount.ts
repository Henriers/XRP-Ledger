import { ref } from 'vue';
import { Client } from 'xrpl';

interface TransactionJson {
  DeliverMax?: string;
  Fee: string;
  TransactionType: string;
  LimitAmount?: CurrencyAmount;
}

interface CurrencyAmount {
  currency: string;
  issuer: string;
  value: number;
}

interface Transaction {
  close_time_iso: Date;
  hash: string;
  ledger_hash: string;
  ledger_index: number;
  tx_json: TransactionJson;
}

interface AccountData {
  account: string;
  balance: number;
}

interface TransactionsResponse {
  transactions: Transaction[];
}

interface AccountInfoResponse {
  account_data: {
    Account: string;
    Balance: string;
  };
}

export const useXrpAccount = () => {
  const accountData = ref<AccountData | null>(null);
  const transactions = ref<Transaction[]>([]);
  const loading = ref(false);
  const client = new Client('wss://s.altnet.rippletest.net:51233');

  const getAccountInfo = async (account: string) => {
    loading.value = true;
    accountData.value = null;
    transactions.value = [];

    try {
      await client.connect();

      const accountInfo: AccountInfoResponse = await client.request({
        command: 'account_info',
        account: account,
        ledger_index: 'validated',
      });

      accountData.value = {
        account: accountInfo.result.account_data.Account,
        balance: parseFloat(accountInfo.result.account_data.Balance) / 1000000,
      };

      console.log(accountInfo)

      const transactionsResponse: { result: TransactionsResponse } = await client.request({
        command: 'account_tx',
        account: account,
        ledger_index_min: -1,
        ledger_index_max: -1,
        limit: 20,
      });

      console.log(transactionsResponse);

      if (transactionsResponse.result.transactions && transactionsResponse.result.transactions.length > 0) {
        transactions.value = transactionsResponse.result.transactions.map(tx => ({
          close_time_iso: new Date(tx.close_time_iso),
          hash: tx.hash,
          ledger_hash: tx.ledger_hash,
          ledger_index: tx.ledger_index,
          tx_json: {
            DeliverMax: tx.tx_json.DeliverMax || '',
            Fee: parseFloat(tx.tx_json.Fee),
            TransactionType: tx.tx_json.TransactionType,
            LimitAmount: tx.tx_json.LimitAmount ? {
              currency: tx.tx_json.LimitAmount.currency || 'XRP',
              issuer: tx.tx_json.LimitAmount.issuer || '',
              value: tx.tx_json.LimitAmount.value || 0,
            } : undefined,
          },
        }));
      } else {
        console.error('No transactions found in the response:', transactionsResponse);
      }
    } catch (error) {
      console.error('Error fetching account info:', error);
    } finally {
      loading.value = false;
      await client.disconnect();
    }
  };

  return {
    accountData,
    transactions,
    loading,
    getAccountInfo,
  };
};
