import UserService from '../services/user.service';

export const user = {
  namespaced: true,
  actions: {
    getUsernames({ commit }) {
      return UserService.getUsernames().then(
        usernames => {
          return Promise.resolve(usernames);
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  }
};
