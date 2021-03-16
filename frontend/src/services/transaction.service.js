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

    updateTransaction(transaction) {
        return api().put(`/api/transactions/${transaction.id}`, {
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

    getTransaction(id) {
        return api().get(`/api/transactions/${id}`);
    }

    deleteTransaction(id) {
        return api().delete(`/api/transactions/${id}`);
    }
}

export default new TransactionService();
