package com.cabservice.megacity.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.cabservice.megacity.Model.Category;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {

    List<Category> findByCatType(String catType);

    Category findByCatModel(String catModel);

    
}
