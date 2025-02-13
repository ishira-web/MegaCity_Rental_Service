package com.cabservice.megacity.Controller;

import com.cabservice.megacity.Model.Admin;
import com.cabservice.megacity.Service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.createAdmin(admin);
    }

    @GetMapping("/{adminID}")
    public Admin getAdminId(@PathVariable String adminID) {
        return adminService.getAdminById(adminID);
    }
}