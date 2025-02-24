package com.cabservice.megacity.Controller;

import com.cabservice.megacity.Model.Customer;
import com.cabservice.megacity.Service.CloudinaryService;
import com.cabservice.megacity.Service.CustomerService;
import com.cabservice.megacity.Service.EmailService;

import jakarta.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/customers") // Base URL for all customer-related endpoints
public class CustomerController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    // Create a new customer
    @PostMapping("/auth/createCustomer")
    public ResponseEntity<Customer> createCustomer(
            @RequestParam(value = "customerProfile", required = false) MultipartFile customerProfile,
            @RequestParam(value = "nicFront", required = false) MultipartFile nicFront,
            @RequestParam(value = "nicBack", required = false) MultipartFile nicBack,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("dob") String dob,
            @RequestParam("userName") String userName,
            @RequestParam("password") String password,
            @RequestParam("nicNumber") String nicNumber) throws IOException, MessagingException {

        // Upload files to Cloudinary (if provided)
        String customerProfileUrl = uploadFile(customerProfile);
        String nicFrontUrl = uploadFile(nicFront);
        String nicBackUrl = uploadFile(nicBack);

        // Create and populate the Customer object
        Customer customer = new Customer();
        customer.setName(name);
        customer.setEmail(email);
        customer.setPhone(phone);
        customer.setDob(dob);
        customer.setUserName(userName);
        customer.setPassword(passwordEncoder.encode(password)); // Encrypt password
        customer.setNicNumber(nicNumber);
        customer.setCustomerProfile(customerProfileUrl);
        customer.setNicFront(nicFrontUrl);
        customer.setNicBack(nicBackUrl);

        // Save the customer to the database
        Customer createdCustomer = customerService.createCustomer(customer);

        // Send welcome email
        emailService.sendWelcomeEmail(email, name);

        return new ResponseEntity<>(createdCustomer, HttpStatus.CREATED);
    }

    // Get all customers
    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    // Get customer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        Customer customer = customerService.getCustomerById(id);
        if (customer != null) {
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get customer by email
    @GetMapping("/email/{email}")
    public ResponseEntity<Customer> getCustomerByEmail(@PathVariable String email) {
        Customer customer = customerService.getCustomerByEmail(email);
        if (customer != null) {
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Get customers by name
    @GetMapping("/name/{name}")
    public ResponseEntity<List<Customer>> getCustomersByName(@PathVariable String name) {
        List<Customer> customers = customerService.getCustomersByName(name);
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    // Update customer by ID
    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(
            @PathVariable String id,
            @RequestParam(value = "customerProfile", required = false) MultipartFile customerProfile,
            @RequestParam(value = "nicFront", required = false) MultipartFile nicFront,
            @RequestParam(value = "nicBack", required = false) MultipartFile nicBack,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "email", required = false) String email,
            @RequestParam(value = "phone", required = false) String phone,
            @RequestParam(value = "dob", required = false) String dob,
            @RequestParam(value = "userName", required = false) String userName,
            @RequestParam(value = "password", required = false) String password,
            @RequestParam(value = "nicNumber", required = false) String nicNumber) throws IOException {

        // Upload files to Cloudinary (if provided)
        String customerProfileUrl = uploadFile(customerProfile);
        String nicFrontUrl = uploadFile(nicFront);
        String nicBackUrl = uploadFile(nicBack);

        // Create and populate the Customer object
        Customer customer = new Customer();
        customer.setCustomerId(id);;
        customer.setName(name);
        customer.setEmail(email);
        customer.setPhone(phone);
        customer.setDob(dob);
        customer.setUserName(userName);
        if (password != null) {
            customer.setPassword(passwordEncoder.encode(password)); // Encrypt password
        }
        customer.setNicNumber(nicNumber);
        customer.setCustomerProfile(customerProfileUrl);
        customer.setNicFront(nicFrontUrl);
        customer.setNicBack(nicBackUrl);

        // Update the customer in the database
        Customer updatedCustomer = customerService.updateCustomer(customer);
        if (updatedCustomer != null) {
            return new ResponseEntity<>(updatedCustomer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete customer by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        boolean isDeleted = customerService.deleteCustomer(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Helper method to upload files to Cloudinary
    private String uploadFile(MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            return cloudinaryService.uploadImage(file);
        }
        return null;
    }
}