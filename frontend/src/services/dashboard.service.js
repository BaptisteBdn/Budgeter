import api from '@/services/api'

class DashboardService {
    getTotalByCategories() {
        return api().get('/api/dashboard/categories');
    }
}

export default new DashboardService();
