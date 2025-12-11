package com.plant_fertilizer_ai.blog_service.controller;

import com.plant_fertilizer_ai.blog_service.model.Blog;
import com.plant_fertilizer_ai.blog_service.service.BlogService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    public ResponseEntity<List<Blog>> getAllBlogs() {
        log.info("get all blogs");
        return ResponseEntity.ok(blogService.getAllPublishedBlogs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlog(@PathVariable Long id) {
        Blog article = blogService.incrementViews(id);
        return ResponseEntity.ok(article);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Blog>> getBlogsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(blogService.getBlogsByCategory(category));
    }

    @PostMapping
    public ResponseEntity<Blog> createBlog(@RequestBody Blog article) {
        return ResponseEntity.ok(blogService.createBlog(article));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @RequestBody Blog article) {
        return ResponseEntity.ok(blogService.updateBlog(id, article));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.ok().build();
    }
}
