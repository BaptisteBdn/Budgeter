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

    getAllCategories() {
        return api().get('/api/categories/all');
    }

    getSubcategories(category) {
        return api().get(`/api/categories/${category}`);
    }

    delete(category) {
        return api().delete('/api/categories', {
            data: {
                category: category.category,
                subcategory: category.subcategory,
            }
        });
    }

    updateCategorie(category, newCategory) {
        return api().post(`/api/categories/${category}`, {
            category: newCategory,
        });
    }

    updateSubCategorie(category, subcategory, newSubCategory) {
        return api().post(`/api/categories/${category}/subcategory/${subcategory}`, {
            subcategory: newSubCategory,
        });
    }
}

export default new CategoryService();
