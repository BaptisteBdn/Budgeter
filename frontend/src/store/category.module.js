import CategoryService from '../services/category.service';

export const category = {
  namespaced: true,
  actions: {
    create({ commit }, category) {
      return CategoryService.create(category).then(
        category => {
          return Promise.resolve(category);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    getCategories({ commit }) {
      return CategoryService.getCategories().then(
        category => {
          return Promise.resolve(category);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    getAllCategories({ commit }) {
      return CategoryService.getAllCategories().then(
        category => {
          return Promise.resolve(category);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    getSubcategories({ commit }, category) {
      return CategoryService.getSubcategories(category).then(
        category => {
          return Promise.resolve(category);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    delete({ commit }, category) {
      return CategoryService.delete(category).then(
        category => {
          return Promise.resolve(category);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }, 
    updateCategorie({ commit }, payload) {
      return CategoryService.updateCategorie(payload.category, payload.newCategory).then(
        category => {
          return Promise.resolve(category);
        },
        error => {
          return Promise.reject(error);
        }
      );
    },    
    updateSubCategorie({ commit }, payload) {
      return CategoryService.updateSubCategorie(payload.category, payload.subCategory, payload.newSubCategory).then(
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
