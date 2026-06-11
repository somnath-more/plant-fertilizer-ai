import apiClient from './apiClient';

/**
 * Fetch all products
 * @returns {Promise<{status: boolean, message: string, data: any}>}
 */
export const getAllProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    return {
      status: response.status,
      message: response.message || 'Products fetched successfully',
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || 'Failed to fetch products',
      data: null,
    };
  }
};

/**
 * Add a new product with optional image files
 * @param {FormData|Object} productData - Product data (FormData if files, else JSON object)
 * @returns {Promise<{status: boolean, message: string, data: any}>}
 */
export const ADD_PRODUCT = async (productData) => {
  try {
    const isFormData = typeof FormData !== 'undefined' && productData instanceof FormData;
    
    let config = {};
    if (isFormData) {
      // For FormData, let axios set the multipart boundary
      config.headers = {};
    }

    const response = await apiClient.post('/products', productData, config);
    return {
      status: response.status,
      message: response.message || 'Product added successfully',
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || 'Failed to add product',
      data: null,
    };
  }
};

/**
 * Update product stock
 * @param {string|number} productId - Product ID
 * @param {number} stock - New stock quantity
 * @returns {Promise<{status: boolean, message: string, data: any}>}
 */
export const updateProductStock = async (productId, stock) => {
  try {
    const response = await apiClient.put(`/products/${productId}/stock`, { stock });
    return {
      status: response.status,
      message: response.message || 'Product stock updated',
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || 'Failed to update stock',
      data: null,
    };
  }
};

/**
 * Delete a product
 * @param {string|number} productId - Product ID
 * @returns {Promise<{status: boolean, message: string, data: any}>}
 */
export const deleteProduct = async (productId) => {
  try {
    const response = await apiClient.delete(`/products/${productId}`);
    return {
      status: response.status,
      message: response.message || 'Product deleted successfully',
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || 'Failed to delete product',
      data: null,
    };
  }
};