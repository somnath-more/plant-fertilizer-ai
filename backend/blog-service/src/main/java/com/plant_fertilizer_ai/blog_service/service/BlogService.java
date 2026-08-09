package com.plant_fertilizer_ai.blog_service.service;

import com.plant_fertilizer_ai.blog_service.dto.BlogDto;
import com.plant_fertilizer_ai.blog_service.model.Blog;

import java.util.List;

public interface BlogService {
    // Fetch all published blogs
    List<Blog> getAllPublishedBlogs(String category);

    List<Blog> getStaffPicks(String sort, int limit);

    // Fetch a single blog and increment views
    Blog incrementViews(Long id);

    Blog incrementLikes(Long id);

    // Create a new blog
    Blog createBlog(BlogDto blogRequest);

    // Update an existing blog
    Blog updateBlog(Long id, Blog blog);

    // Delete blog by ID
    void deleteBlog(Long id);
}
