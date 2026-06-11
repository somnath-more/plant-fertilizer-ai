package com.plant_fetlilizer_ai.product_service.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.plant_fetlilizer_ai.product_service.config.ProductMapper;
import com.plant_fetlilizer_ai.product_service.constants.Messages;
import com.plant_fetlilizer_ai.product_service.dto.ProductRequest;
import com.plant_fetlilizer_ai.product_service.dto.ProductResponseDto;
import com.plant_fetlilizer_ai.product_service.exception.CustomException;
import com.plant_fetlilizer_ai.product_service.model.Product;
import com.plant_fetlilizer_ai.product_service.repository.ProductRepository;
import com.plant_fetlilizer_ai.product_service.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ObjectMapper objectMapper;

    @Value("${product.upload.dir:uploads/products}")
    private String uploadDir;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper, ObjectMapper objectMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.objectMapper = objectMapper;
    }

    @Override
    public List<ProductResponseDto> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(productMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public ProductResponseDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new CustomException(Messages.PRODUCT_NOT_FOUND, HttpStatus.NOT_FOUND));
        return productMapper.toDto(product);
    }

    @Override
    public List<ProductResponseDto> searchProducts(String query) {
        List<Product> products = productRepository.searchProducts(query);
        if (products.isEmpty()) {
            throw new CustomException("No products found for query: " + query, HttpStatus.NOT_FOUND);
        }
        return products.stream().map(productMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<ProductResponseDto> getProductsByCategory(String category) {
        List<Product> products = productRepository.findByCategory(category);
        if (products.isEmpty()) {
            throw new CustomException("No products found for category: " + category, HttpStatus.NOT_FOUND);
        }
        return products.stream().map(productMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public ProductResponseDto addProduct(ProductRequest productRequest, MultipartFile[] files) {
        try {


            // Create product entity
            Product product = new Product();
            product.setName(productRequest.getName());
            product.setDescription(productRequest.getDescription());
            product.setPrice(productRequest.getPrice());
            product.setStock(productRequest.getStock());
            product.setCategory(productRequest.getCategory());
            product.setNpkRatio(productRequest.getNpkRatio());
            product.setWeight(productRequest.getWeight());
            product.setOrganic(productRequest.getOrganic());
            product.setFeatured(productRequest.getFeatured());

            // Save files and collect URLs
            List<String> imageUrls = new ArrayList<>();
            log.info("Received {} files for upload", files != null ? files.length : 0);
            if (files != null && files.length > 0) {
                Path uploadPath = Paths.get(uploadDir);
                log.info("Upload directory: {}", uploadPath.toAbsolutePath());
                if (!Files.exists(uploadPath)) {
                    log.info("Upload directory does not exist, creating...");
                    Files.createDirectories(uploadPath);
                }

                for (int i = 0; i < files.length; i++) {
                    MultipartFile file = files[i];
                    if (file == null || file.isEmpty()) continue;

                    String contentType = file.getContentType();
                    if (contentType == null || !contentType.startsWith("image/")) {
                        throw new CustomException("File " + i + " must be an image", HttpStatus.BAD_REQUEST);
                    }

                    if (file.getSize() > 5 * 1024 * 1024) {
                        throw new CustomException("File " + i + " exceeds 5MB limit", HttpStatus.BAD_REQUEST);
                    }

                    String originalFilename = file.getOriginalFilename();
                    String extension = "";
                    if (originalFilename != null && originalFilename.contains(".")) {
                        extension = originalFilename.substring(originalFilename.lastIndexOf('.'));
                    }
                    String uniqueFilename = UUID.randomUUID().toString() + "_" + i + extension;
                    Path filePath = uploadPath.resolve(uniqueFilename);
                    Files.write(filePath, file.getBytes());
                    log.info("Saved file {}", filePath.toString());
                    imageUrls.add("/uploads/products/" + uniqueFilename);
                }
            }

            // Use provided imageUrls from request if no files uploaded
            if ((productRequest.getImageUrls() != null && !productRequest.getImageUrls().isEmpty()) && imageUrls.isEmpty()) {
                imageUrls = productRequest.getImageUrls();
            }

            if (!imageUrls.isEmpty()) {
                product.setImageUrl(String.join(",", imageUrls));
            }

            Product savedProduct = productRepository.save(product);
            log.info("Product saved with ID: {}", savedProduct.getId());

            return productMapper.toDto(savedProduct);
        } catch (CustomException ce) {
            log.info("Custom exception occurred: {}", ce.getMessage());
            throw ce;
        } catch (IOException e) {
            log.error("Error parsing imageMetaJson or saving file", e);
            throw new CustomException("Failed to save image or parse metadata: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            log.error("Error adding product", e);
            throw new CustomException("Failed to add product: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ProductResponseDto updateStock(Long id, Integer stock) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new CustomException(Messages.PRODUCT_NOT_FOUND + " with id: " + id, HttpStatus.NOT_FOUND));

        product.setStock(stock);
        Product updatedProduct = productRepository.save(product);
        return productMapper.toDto(updatedProduct);
    }

                                                                                                                        }
