import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(data: CreateTransactionDTO): Transaction {
    if (
      data.type === 'outcome' &&
      data.value > this.transactionsRepository.getBalance().total
    ) {
      throw Error('Outcome value is more than total');
    }

    const transaction = this.transactionsRepository.create({
      title: data.title,
      type: data.type,
      value: data.value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
