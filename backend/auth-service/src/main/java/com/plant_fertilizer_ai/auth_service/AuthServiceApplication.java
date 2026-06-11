package com.plant_fertilizer_ai.auth_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
@EnableDiscoveryClient
public class AuthServiceApplication {


	public static void main(String[] args) {

	 final ConfigurableApplicationContext context=	SpringApplication.run(AuthServiceApplication.class, args);

		System.out.println("Wait here");
	}

}
