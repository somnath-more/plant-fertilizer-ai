import apiClient from './apiClient';

/**
 * Create a new blog
 * @param {Object} blog - Blog data
 * @returns {Promise<{status: boolean, message: string, data: any}>}
 */
export const ADD_BLOG = async (blog) => {
  try {
    const response = await apiClient.post('/blogs', blog);
    return {
      status: response.status,
      message: response.message || 'Blog published successfully',
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || 'Failed to publish blog',
      data: null,
    };
  }
};

/**
 * Fetch all blogs
 * @returns {Promise<{status: boolean, message: string, data: any}>}
 */
export const getAllBlogs = async () => {
  try {
    const response = await apiClient.get('/blogs');
    return {
      status: response.status,
      message: response.message || 'Blogs fetched successfully',
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || 'Failed to fetch blogs',
      data: null,
    };
  }
};

/**
 * Delete a blog
 * @param {string|number} blogId - Blog ID
 * @returns {Promise<{status: boolean, message: string, data: any}>}
 */
export const deleteBlog = async (blogId) => {
  try {
    const response = await apiClient.delete(`/blogs/${blogId}`);
    return {
      status: response.status,
      message: response.message || 'Blog deleted successfully',
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || 'Failed to delete blog',
      data: null,
    };
  }
};

