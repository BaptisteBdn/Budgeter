import api from '@/services/api'

class CategoryService {
    create(category) {
        return api().post('/api/categories', {
            category: category.category,
            subcategory: category.subcategory,
        });
    }

    getCategories() {
        return api().get('/api/categories');
    }

    getSubcategories(category) {
        return api().get(`/api/categories/${category}`);
    }
}

export default new CategoryService();
