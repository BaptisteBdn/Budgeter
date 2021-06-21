import DashboardService from '../services/dashboard.service';

export const dashboard = {
  namespaced: true,
  actions: {
    getTotalByCategories({ commit }) {
      return DashboardService.getTotalByCategories().then(
        category => {
          return Promise.resolve(category);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
  }
};
