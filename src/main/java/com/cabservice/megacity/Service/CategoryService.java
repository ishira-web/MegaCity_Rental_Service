package com.cabservice.megacity.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cabservice.megacity.Model.Category;
import com.cabservice.megacity.Repository.CategoryRepository;

@Service
public class CategoryService {
    
     @Autowired
    private CategoryRepository categoryRepository;

    //Create
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    //Get Category
    public Category getCategoryById(String catID) {
        return categoryRepository.findById(catID).get();
    }
    //Delete
    public String deleteCategory(String catID) {
        categoryRepository.deleteById(catID);
        return catID+" deleted";
    }

}
