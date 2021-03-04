import api from '@/services/api'

class UserService {
    getUsernames() {
        return api().get('/api/user/usernames');
    }
}

export default new UserService();
