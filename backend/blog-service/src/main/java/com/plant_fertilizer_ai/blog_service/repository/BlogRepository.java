package com.plant_fertilizer_ai.blog_service.repository;

import com.plant_fertilizer_ai.blog_service.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByPublishedTrueOrderByPublishedAtDesc();
    List<Blog> findByCategoryIgnoreCaseAndPublishedTrueOrderByPublishedAtDesc(String category);
    List<Blog> findByPublishedTrueOrderByViewsDescPublishedAtDesc(Pageable pageable);
    List<Blog> findByPublishedTrueOrderByLikesDescPublishedAtDesc(Pageable pageable);
}
