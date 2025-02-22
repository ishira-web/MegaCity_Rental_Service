package com.cabservice.megacity.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.cabservice.megacity.Model.Category;
import com.cabservice.megacity.Service.CategoryService;

@RestController
public class CategoryController {
    
    @Autowired
    private CategoryService catService;

    @PostMapping("/auth/createcategory")
    @ResponseStatus(HttpStatus.CREATED)
    public Category createCategory(@RequestBody Category category) {
        return catService.createCategory(category);
    }

    @GetMapping("/{catID}")
    public Category getCategoryById(@PathVariable String catID) {
        return catService.getCategoryById(catID);
    }

    @DeleteMapping("/{catID}")
    public String deleteCategory(@PathVariable String catID) {
        return catService.deleteCategory(catID);
    }

    // Example in Java (Spring Boot)
    @GetMapping("/auth/getAllCategories")
    public List<Category> getAllCategories() {
    return catService.getAllCategories()
                     .stream()
                     .distinct() // Ensure unique categories
                     .collect(Collectors.toList());
     }

     
    @GetMapping("auth/catModels/{catType}")
    public List<Category> getCatModelsByCatType(@PathVariable String catType) {
        return catService.getCatModelsByCatType(catType);
    }
}