package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.User;
import java.util.List;


public interface UserRepository extends JpaRepository<User, Integer>{

    User findByEmail(String email);
}
