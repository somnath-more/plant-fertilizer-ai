import apiClient from './apiClient';

export const placeOrder = async (order) => {
  try {
    const response = await apiClient.post('/orders', order);
    return {
      status: response.status,
      message: response.message || 'Order placed successfully',
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || 'Failed to place order',
      data: null,
    };
  }
};
