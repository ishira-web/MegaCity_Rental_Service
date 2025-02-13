package com.cabservice.megacity.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cabservice.megacity.Model.Category;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
   
    
}
