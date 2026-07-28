package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
@SpringBootApplication
public class Security5Application {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(Security5Application.class, args);
		for (Object o : ctx.getBeanDefinitionNames())
			System.out.println(o);
	}
}
