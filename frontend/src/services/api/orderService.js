import apiClient from './apiClient';

export const placeOrder = async (orderRequest) => {
  try {
    const response = await apiClient.post('/orders', orderRequest);
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
