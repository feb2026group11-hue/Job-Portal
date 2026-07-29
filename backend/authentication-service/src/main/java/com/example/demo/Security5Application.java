package com.example.demo;
import org.apache.catalina.core.ApplicationContext;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.security.authentication.AuthenticationManager;

@SpringBootApplication
public class Security5Application {
	private final AuthenticationManager authenticationManager;

	Security5Application(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}
 
	public static void main(String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(Security5Application.class, args);
	}
}
