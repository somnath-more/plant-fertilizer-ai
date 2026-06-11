package com.plant_fertilizer_ai.blog_service.controller;

import com.plant_fertilizer_ai.blog_service.constants.Messages;
import com.plant_fertilizer_ai.blog_service.exception.ApiResponse;
import com.plant_fertilizer_ai.blog_service.model.Blog;
import com.plant_fertilizer_ai.blog_service.service.BlogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/blogs")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Slf4j
public class BlogController {

    private final BlogService blogService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Blog>>> getAllBlogs() {
        log.info("get all blogs");
        List<Blog> blogs = blogService.getAllPublishedBlogs();
        return ResponseEntity.ok(ApiResponse.success(Messages.BLOGS_RETRIEVED_SUCCESSFULLY, blogs, 200, null));
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> health() {
        return ResponseEntity.ok(ApiResponse.success(Messages.SERVICE_HEALTHY, "All is Good", 200, null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Blog>> getBlog(@PathVariable Long id) {
        Blog article = blogService.incrementViews(id);
        return ResponseEntity.ok(ApiResponse.success(Messages.BLOG_RETRIEVED_SUCCESSFULLY, article, 200, id));
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<ApiResponse<List<Blog>>> getBlogsByCategory(@PathVariable String category) {
        List<Blog> blogs = blogService.getBlogsByCategory(category);
        return ResponseEntity.ok(ApiResponse.success(Messages.BLOGS_BY_CATEGORY_RETRIEVED_SUCCESSFULLY, blogs, 200, category));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Blog>> createBlog(@RequestBody Blog article) {
        Blog created = blogService.createBlog(article);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(Messages.BLOG_CREATED_SUCCESSFULLY, created, 201, created.getId()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Blog>> updateBlog(@PathVariable Long id, @RequestBody Blog article) {
        Blog updated = blogService.updateBlog(id, article);
        return ResponseEntity.ok(ApiResponse.success(Messages.BLOG_UPDATED_SUCCESSFULLY, updated, 200, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok(ApiResponse.success(Messages.BLOG_DELETED_SUCCESSFULLY, null, 200, id));
    }
}