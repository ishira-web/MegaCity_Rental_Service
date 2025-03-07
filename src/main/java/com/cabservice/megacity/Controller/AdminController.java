package com.cabservice.megacity.Controller;

import com.cabservice.megacity.Model.Admin;
import com.cabservice.megacity.Service.AdminService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    

    @PostMapping("/auth/admincreate")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity <Admin> createAdmin(@RequestBody Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        Admin saveAdmin = adminService.createAdmin(admin);
        return ResponseEntity.ok(saveAdmin);
    }

    @GetMapping("/auth/{adminID}")
    public Admin getAdminId(@PathVariable String adminID) {
        return adminService.getAdminById(adminID);
    }

      // Fetch all admins
    @GetMapping("/auth/getAllAdmins")

    public List<Admin> getAllAdmins() {
        return adminService.getAllAdmins();
    }

     // Delete an admin by ID
     @DeleteMapping("/auth/deleteAdmin/{adminID}")
     public void deleteAdmin(@PathVariable String adminID) {
         adminService.deleteAdmin(adminID);
     }
}