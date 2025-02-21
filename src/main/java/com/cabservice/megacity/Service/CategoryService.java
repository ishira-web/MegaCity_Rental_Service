package com.cabservice.megacity.Service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cabservice.megacity.Model.Category;
import com.cabservice.megacity.Repository.CategoryRepository;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;

    // Create
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Get Category by ID
    public Category getCategoryById(String catID) {
        return categoryRepository.findById(catID).get();
    }

    // Delete
    public String deleteCategory(String catID) {
        categoryRepository.deleteById(catID);
        return catID + " deleted";
    }

    // Get all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Get all catModels by catType
    public List<Category> getCatModelsByCatType(String catType) {
        return categoryRepository.findByCatType(catType);
    }
}