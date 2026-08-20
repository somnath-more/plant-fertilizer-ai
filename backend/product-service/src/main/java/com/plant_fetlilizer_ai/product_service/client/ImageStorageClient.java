package com.plant_fetlilizer_ai.product_service.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Component
public class ImageStorageClient {

    private final RestClient restClient;

    public ImageStorageClient(RestClient.Builder builder,
                              @Value("${image-storage-service.url:http://localhost:8087}") String serviceUrl) {
        this.restClient = builder.baseUrl(serviceUrl).build();
    }

    public Map<String, String> uploadImage(MultipartFile file) throws IOException {
        ByteArrayResource resource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };

        MultiValueMap<String, Object> multipartBody = new LinkedMultiValueMap<>();
        HttpHeaders fileHeaders = new HttpHeaders();
        fileHeaders.setContentType(MediaType.parseMediaType(file.getContentType()));
        fileHeaders.setContentDispositionFormData("file", file.getOriginalFilename());
        multipartBody.add("file", new HttpEntity<>(resource, fileHeaders));

        return restClient.post()
                .uri("/api/images/upload")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(multipartBody)
                .retrieve()
                .body(new ParameterizedTypeReference<>() {});
    }
}
