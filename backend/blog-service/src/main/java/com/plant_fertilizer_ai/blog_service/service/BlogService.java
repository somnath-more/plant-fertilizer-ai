package com.plant_fertilizer_ai.blog_service.service;

import com.plant_fertilizer_ai.blog_service.model.Blog;

import java.util.List;

public interface BlogService {
    // Fetch all published blogs
    List<Blog> getAllPublishedBlogs();

    // Fetch a single blog and increment views
    Blog incrementViews(Long id);

    // Fetch blogs by category
    List<Blog> getBlogsByCategory(String category);

    // Create a new blog
    Blog createBlog(Blog blog);

    // Update an existing blog
    Blog updateBlog(Long id, Blog blog);

    // Delete blog by ID
    void deleteBlog(Long id);
}
