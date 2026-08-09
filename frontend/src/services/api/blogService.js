import apiClient from './apiClient';

/**
 * Create a new blog
 * @param {Object} blog - Blog data
 * @returns {Promise<{status: boolean, message: string, data: any}>}
 */
export const ADD_BLOG = async (blog) => {
  try {
    const blogRequest = {
      title: blog.title?.trim(),
      excerpt: blog.excerpt?.trim() || '',
      content: blog.content,
      category: blog.category?.trim() || 'General',
      author: blog.author?.trim() || 'Garden Team',
      imageUrl: blog.imageUrl?.trim() || null,
      readTime: blog.readTime || '1 min read',
      published: blog.published ?? true,
    };

    const response = await apiClient.post('/blogs', blogRequest);
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
 * Fetch latest published blogs, optionally filtered by category
 * @param {string} [category] - Optional category filter
 * @returns {Promise<{status: boolean, message: string, data: any}>}
 */
export const getAllBlogs = async (category) => {
  try {
    const response = await apiClient.get('/blogs', {
      params: category && category !== 'All' ? { category } : undefined,
    });
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

export const getStaffPicks = async (sort = 'views', limit = 3) => {
  try {
    const response = await apiClient.get('/blogs/staff-picks', {
      params: { sort, limit },
    });
    return {
      status: response.status,
      message: response.message,
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || 'Failed to fetch ranked blogs',
      data: null,
    };
  }
};

export const likeBlog = async (blogId) => {
  try {
    const response = await apiClient.post(`/blogs/${blogId}/like`);
    return {
      status: response.status,
      message: response.message || 'Blog liked successfully',
      data: response.data,
    };
  } catch (error) {
    return {
      status: false,
      message: error.message || 'Failed to like blog',
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
