package com.cabservice.megacity.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.cabservice.megacity.Model.Category;
import com.cabservice.megacity.Service.CategoryService;

@RestController
@RequestMapping("/categories")
public class CategoryController {
    
     @Autowired
    private CategoryService catService;

    @PostMapping("/createcategory")
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

}
