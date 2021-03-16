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
    },
    updateTransaction({ commit }, transaction) {
      return TransactionService.updateTransaction(transaction).then(
        transaction => {
          return Promise.resolve(transaction);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    getTransactions({ commit }) {
      return TransactionService.getUserTransaction().then(
        transaction => {
          return Promise.resolve(transaction);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    getTransaction({ commit }, id) {
      return TransactionService.getTransaction(id).then(
        transaction => {
          return Promise.resolve(transaction);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    deleteTransaction({ commit }, id) {
      return TransactionService.deleteTransaction(id).then(
        transaction => {
          return Promise.resolve(transaction);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
  }
};
