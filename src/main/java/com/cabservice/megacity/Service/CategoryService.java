package com.cabservice.megacity.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cabservice.megacity.Model.Category;
import com.cabservice.megacity.Repository.CategoryRepository;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;

    // Create a new category
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Get Category by ID with exception handling
    public Category getCategoryById(String catID) {
        Optional<Category> category = categoryRepository.findById(catID);
        return category.orElseThrow(() -> new RuntimeException("Category not found with ID: " + catID));
    }

    // Delete Category by ID with validation
    public String deleteCategory(String catID) {
        if (!categoryRepository.existsById(catID)) {
            throw new RuntimeException("Category with ID " + catID + " does not exist.");
        }
        categoryRepository.deleteById(catID);
        return "Category with ID " + catID + " has been deleted.";
    }

    // Get all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Get all models by category type
    public List<Category> getCatModelsByCatType(String catType) {
        return categoryRepository.findByCatType(catType);
    }

    // Get all distinct car types for dropdown in frontend
    public List<String> getAllCarTypes() {
        return categoryRepository.findAll()
                .stream()
                .map(Category::getCatType)
                .distinct()
                .collect(Collectors.toList());
    }

    public String getPricePerKmByCatModel(String catModel) {
        Category category = categoryRepository.findByCatModel(catModel);
        if (category != null) {
            return category.getPricePerKm();
        }
        return null; // or throw an exception if category not found
    }
}
