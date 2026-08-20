package com.plant_fetlilizer_ai.image_storage_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ImageStorageServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImageStorageServiceApplication.class, args);
	}

}
