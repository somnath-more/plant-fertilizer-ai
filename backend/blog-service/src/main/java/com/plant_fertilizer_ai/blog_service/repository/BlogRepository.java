package com.plant_fertilizer_ai.blog_service.repository;

import com.plant_fertilizer_ai.blog_service.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByPublishedTrueOrderByPublishedAtDesc();
    List<Blog> findByCategoryAndPublishedTrueOrderByPublishedAtDesc(String category);
}
