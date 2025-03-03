package com.cabservice.megacity.Controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cabservice.megacity.Model.Category;
import com.cabservice.megacity.Service.CategoryService;

@RestController
public class CategoryController {
    
    @Autowired
    private CategoryService catService;

    // ✅ Create a new vehicle category
    @PostMapping("/auth/createcategory")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category createdCategory = catService.createCategory(category);
        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    // ✅ Get a single category by ID
    @GetMapping("/category/{catID}")
    public ResponseEntity<Category> getCategoryById(@PathVariable String catID) {
        try {
            Category category = catService.getCategoryById(catID);
            return ResponseEntity.ok(category);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/auth/{catID}") // Change from "/category/{catID}"
    public ResponseEntity<String> deleteCategory(@PathVariable String catID) {
        try {
            String message = catService.deleteCategory(catID);
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Category not found.");
        }
    }
    

    // ✅ Get all vehicle categories
    @GetMapping("/auth/getAllCategories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = catService.getAllCategories()
                .stream()
                .distinct()
                .collect(Collectors.toList());
        return ResponseEntity.ok(categories);
    }

    // ✅ Get all vehicle models by category type
    @GetMapping("/auth/catModels/{catType}")
    public ResponseEntity<List<Category>> getCatModelsByCatType(@PathVariable String catType) {
        List<Category> categories = catService.getCatModelsByCatType(catType);
        return ResponseEntity.ok(categories);
    }

    // ✅ New Endpoint: Get all unique car types (for frontend dropdown)
    @GetMapping("/auth/getCarTypes")
    public ResponseEntity<List<String>> getAllCarTypes() {
        List<String> carTypes = catService.getAllCarTypes();
        return ResponseEntity.ok(carTypes);
    }
}
