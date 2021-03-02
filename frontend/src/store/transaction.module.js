import TransactionService from '../services/transaction.service';

export const transaction = {
  namespaced: true,
  actions: {
    createTransaction({ commit }, transaction) {
      return TransactionService.createTransaction(transaction).then(
        transaction => {
          return Promise.resolve(transaction);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  }
};
