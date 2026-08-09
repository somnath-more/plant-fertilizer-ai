package com.plant_fertilizer_ai.blog_service.service.Impl;

import com.plant_fertilizer_ai.blog_service.constants.Messages;
import com.plant_fertilizer_ai.blog_service.dto.BlogDto;
import com.plant_fertilizer_ai.blog_service.exception.CustomException;
import com.plant_fertilizer_ai.blog_service.model.Blog;
import com.plant_fertilizer_ai.blog_service.repository.BlogRepository;
import com.plant_fertilizer_ai.blog_service.service.BlogService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;

    @Override
    public List<Blog> getAllPublishedBlogs(String category) {
        if (category == null || category.isBlank()) {
            return blogRepository.findByPublishedTrueOrderByPublishedAtDesc();
        }
        return blogRepository.findByCategoryIgnoreCaseAndPublishedTrueOrderByPublishedAtDesc(category.trim());
    }

    @Override
    public List<Blog> getStaffPicks(String sort, int limit) {
        PageRequest pageRequest = PageRequest.of(0, limit);
        if ("likes".equalsIgnoreCase(sort)) {
            return blogRepository.findByPublishedTrueOrderByLikesDescPublishedAtDesc(pageRequest);
        }
        return blogRepository.findByPublishedTrueOrderByViewsDescPublishedAtDesc(pageRequest);
    }
    public Blog getBlogById(Long id) {
        return blogRepository.findById(id)
                .orElseThrow(() -> new CustomException(Messages.BLOG_NOT_FOUND, HttpStatus.NOT_FOUND));
    }

    @Override
    @Transactional
    public Blog incrementViews(Long id) {
        Blog blog = getBlogById(id);
        blog.setViews((blog.getViews() == null ? 0 : blog.getViews()) + 1);
        return blogRepository.save(blog);
    }

    @Override
    @Transactional
    public Blog incrementLikes(Long id) {
        Blog blog = getBlogById(id);
        blog.setLikes((blog.getLikes() == null ? 0 : blog.getLikes()) + 1);
        return blogRepository.save(blog);
    }

    @Override
    @Transactional
    public Blog createBlog(BlogDto blogRequest) {
        Blog blog = new Blog();
        blog.setTitle(blogRequest.getTitle().trim());
        blog.setExcerpt(blogRequest.getExcerpt());
        blog.setContent(blogRequest.getContent());
        blog.setCategory(blogRequest.getCategory().trim());
        blog.setAuthor(blogRequest.getAuthor().trim());
        blog.setImageUrl(blogRequest.getImageUrl());
        blog.setReadTime(blogRequest.getReadTime());
        blog.setPublished(Boolean.TRUE.equals(blogRequest.getPublished()));
        blog.setViews(0);
        blog.setLikes(0);

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
