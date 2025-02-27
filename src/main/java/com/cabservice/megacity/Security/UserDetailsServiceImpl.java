package com.cabservice.megacity.Security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cabservice.megacity.Model.Admin;
import com.cabservice.megacity.Model.Customer;
import com.cabservice.megacity.Model.Driver;
import com.cabservice.megacity.Repository.AdminRepository;
import com.cabservice.megacity.Repository.CustomerRepository;
import com.cabservice.megacity.Repository.DriverRepository;

import org.springframework.security.core.userdetails.UserDetailsService;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private DriverRepository cabRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // First, try to load the User entity
        Customer customer = customerRepository.findByUserName(username).orElse(null);
        if (customer != null) {
            return org.springframework.security.core.userdetails.User.builder()
                    .username(customer.getUserName())
                    .password(customer.getPassword())
                    .authorities("ROLE_CUSTOMER")
                    .build();
        }

        // If User is not found, try to load the Driver entity
        Driver cabs = cabRepository.findByUserName(username).orElse(null);
        if (cabs != null) {
            return org.springframework.security.core.userdetails.User.builder()
                    .username(cabs.getUserName())
                    .password(cabs.getPassword())
                    .authorities("ROLE_DRIVER")
                    .build();
        }

        Admin admin = adminRepository.findByUserName(username).orElse(null);
        if (admin != null) {
            return org.springframework.security.core.userdetails.User.builder()
                    .username(admin.getUserName())
                    .password(admin.getPassword())
                    .authorities("ROLE_ADMIN")
                    .build();
        }

        // If neither is found, throw an exception
        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}
