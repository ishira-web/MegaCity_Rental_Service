package com.cabservice.megacity.Service;
import com.cabservice.megacity.Model.Admin;
import com.cabservice.megacity.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin createAdmin(Admin admin) {
        System.out.println("Creating admin: " + admin);
        return adminRepository.save(admin);
    }
    public Admin getAdminById(String adminID) {
        return adminRepository.findById(adminID).get();
    }
}
