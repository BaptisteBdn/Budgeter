import api from '@/services/api'

class TransactionService {
    createTransaction(transaction) {
        return api().post('/api/transactions', {
            date: transaction.date,
            credit: transaction.credit,
            debit: transaction.debit,
            account: transaction.account,
            destination: transaction.destination,
            category: transaction.category,
            subcategory: transaction.subcategory,
            comment: transaction.comment,
            who: transaction.who
        });
    }

    getUserTransaction() {
        return api().get('/api/transactions');
    }
}

export default new TransactionService();
