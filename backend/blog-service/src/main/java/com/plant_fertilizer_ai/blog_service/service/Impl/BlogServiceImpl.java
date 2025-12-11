package com.plant_fertilizer_ai.blog_service.service.Impl;

import com.plant_fertilizer_ai.blog_service.exception.CustomException;
import com.plant_fertilizer_ai.blog_service.model.Blog;
import com.plant_fertilizer_ai.blog_service.repository.BlogRepository;
import com.plant_fertilizer_ai.blog_service.service.BlogService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;

    @Override
    public List<Blog> getAllPublishedBlogs() {
        return blogRepository.findByPublishedTrueOrderByPublishedAtDesc();
    }
    public Blog getBlogById(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new CustomException("Blog not found", HttpStatus.NOT_FOUND));
    }

    @Override
    @Transactional
    public Blog incrementViews(Long id) {
        Blog blog = getBlogById(id);
        blog.setViews(blog.getViews() + 1);
        return blogRepository.save(blog);
    }

    @Override
    public List<Blog> getBlogsByCategory(String category) {
        return blogRepository.findByCategoryAndPublishedTrueOrderByPublishedAtDesc(category);
    }

    @Override
    @Transactional
    public Blog createBlog(Blog blog) {
        if (blog.getPublished()) {
            blog.setPublishedAt(LocalDateTime.now());
        }
        return blogRepository.save(blog);
    }

    @Override
    @Transactional
    public Blog updateBlog(Long id, Blog blogDetails) {
        Blog blog = getBlogById(id);
        blog.setTitle(blogDetails.getTitle());
        blog.setExcerpt(blogDetails.getExcerpt());
        blog.setContent(blogDetails.getContent());
        blog.setCategory(blogDetails.getCategory());
        blog.setAuthor(blogDetails.getAuthor());
        blog.setImageUrl(blogDetails.getImageUrl());
        blog.setReadTime(blogDetails.getReadTime());
        blog.setPublished(blogDetails.getPublished());

        if (blogDetails.getPublished() && blog.getPublishedAt() == null) {
            blog.setPublishedAt(LocalDateTime.now());
        }

        return blogRepository.save(blog);
    }

    @Override
    @Transactional
    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }
}
