/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accum: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            accum.income += transaction.value;
            break;
          case 'outcome':
            accum.outcome += transaction.value;
            break;
          default:
            break;
        }

        return accum;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    balance.total = balance.income - balance.outcome;
    return balance;
  }

  public create(data: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title: data.title,
      type: data.type,
      value: data.value,
    });

    const index = this.transactions.push(transaction);

    return this.transactions[index - 1];
  }
}

export default TransactionsRepository;
