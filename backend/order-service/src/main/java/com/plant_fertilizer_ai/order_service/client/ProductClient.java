package com.plant_fertilizer_ai.order_service.client;

import com.plant_fertilizer_ai.order_service.exception.CustomException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

@Component
public class ProductClient {
    private final RestClient restClient;

    public ProductClient(RestClient.Builder builder,
                         @Value("${product.service.base-url:http://localhost:8082}") String baseUrl) {
        this.restClient = builder.baseUrl(baseUrl).build();
    }

    public void reduceStock(Long productId, Integer quantity) {
        try {
            restClient.put()
                    .uri("/api/v1/products/{id}/stock/decrement?quantity={quantity}", productId, quantity)
                    .retrieve()
                    .toBodilessEntity();
        } catch (RestClientResponseException ex) {
            throw new CustomException("Could not reserve product " + productId + ": " + ex.getResponseBodyAsString(),
                    ex.getStatusCode().is4xxClientError() ? HttpStatus.CONFLICT : HttpStatus.BAD_GATEWAY);
        } catch (Exception ex) {
            throw new CustomException("Product service is unavailable", HttpStatus.BAD_GATEWAY);
        }
    }
}
