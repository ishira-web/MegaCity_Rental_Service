package com.cabservice.megacity.Controller;

import com.cabservice.megacity.Model.Customer;
import com.cabservice.megacity.Repository.CustomerRepository;
import com.cabservice.megacity.Security.JWT.JwtUtils;
import com.cabservice.megacity.Service.CategoryService;
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
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class CustomerController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private EmailService emailService; // Inject Email Service

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private CustomerRepository customerRepository;


    @Autowired
     private CategoryService service;

    // Create a new customer
    @PostMapping("/createCustomer")
    public ResponseEntity<?> createCustomer(
            @RequestParam(value = "customerProfile", required = false) MultipartFile customerProfile,
            @RequestParam(value = "nicFront", required = false) MultipartFile nicFront,
            @RequestParam(value = "nicBack", required = false) MultipartFile nicBack,
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("dob") String dob,
            @RequestParam("userName") String userName,
            @RequestParam("password") String password,
            @RequestParam("nicNumber") String nicNumber) {

        try {
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

            // Save customer to database
            Customer createdCustomer = customerService.createCustomer(customer);

            // Send Thank You Email
            emailService.sendThankYouEmail(email, name);

            return new ResponseEntity<>(createdCustomer, HttpStatus.CREATED);

        } catch (IOException | MessagingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    // Get all customers
    @GetMapping("/getAllCustomers")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK);
    }

    // Get customer by ID
    @GetMapping("/getCustomerByID/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable String id) {
        Customer customer = customerService.getCustomerById(id);
        if (customer != null) {
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found!");
        }
    }

    // Update customer by ID
    @PutMapping("/updateCustomer/{id}")
    public ResponseEntity<?> updateCustomer(
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
            @RequestParam(value = "nicNumber", required = false) String nicNumber) {

        try {
            // Upload files to Cloudinary (if provided)
            String customerProfileUrl = uploadFile(customerProfile);
            String nicFrontUrl = uploadFile(nicFront);
            String nicBackUrl = uploadFile(nicBack);

            // Get existing customer
            Customer customer = customerService.getCustomerById(id);
            if (customer == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found!");
            }

            // Update fields if provided
            if (name != null) customer.setName(name);
            if (email != null) customer.setEmail(email);
            if (phone != null) customer.setPhone(phone);
            if (dob != null) customer.setDob(dob);
            if (userName != null) customer.setUserName(userName);
            if (password != null) customer.setPassword(passwordEncoder.encode(password));
            if (nicNumber != null) customer.setNicNumber(nicNumber);
            if (customerProfileUrl != null) customer.setCustomerProfile(customerProfileUrl);
            if (nicFrontUrl != null) customer.setNicFront(nicFrontUrl);
            if (nicBackUrl != null) customer.setNicBack(nicBackUrl);

            // Save updated customer
            Customer updatedCustomer = customerService.updateCustomer(customer);
            return new ResponseEntity<>(updatedCustomer, HttpStatus.OK);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating customer: " + e.getMessage());
        }
    }

    // Delete customer by ID
    @DeleteMapping("/deleteCustomer/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable String id) {
        boolean isDeleted = customerService.deleteCustomer(id);
        if (isDeleted) {
            return ResponseEntity.ok("Customer deleted successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Customer not found!");
        }
    }

    // Helper method to upload files to Cloudinary
    private String uploadFile(MultipartFile file) throws IOException {
        return (file != null && !file.isEmpty()) ? cloudinaryService.uploadImage(file) : null;
    }



     // Step 1: Generate OTP and send email
     @PostMapping("/forgot-password")
     public String forgotPassword(@RequestParam String email) {
         Optional<Customer> userOptional = customerRepository.findByEmail(email);
         if (userOptional.isPresent()) {
             Customer user = userOptional.get();
             String otp = emailService.generateOTP();
             user.setOtp(otp);
             user.setOtpGeneratedTime(System.currentTimeMillis());
             customerRepository.save(user);
             emailService.sendEmail(email, "Password Reset OTP", "Your OTP is: " + otp);
             return "OTP sent successfully!";
         }
         return "User not found!";
     }
 
     // Step 2: Verify OTP
     @PostMapping("/verify-otp")
     public String verifyOtp(@RequestParam String email, @RequestParam String otp) {
         Optional<Customer> userOptional = customerRepository.findByEmail(email);
         if (userOptional.isPresent()) {
             Customer user = userOptional.get();
             long currentTime = System.currentTimeMillis();
             if (user.getOtp().equals(otp) && (currentTime - user.getOtpGeneratedTime() <= 5 * 60 * 1000)) { // 5 minutes expiry
                 return "OTP Verified!";
             }
             return "Invalid or expired OTP!";
         }
         return "User not found!";
     }
 
     // Step 3: Reset Password
     @PostMapping("/reset-password")
        public String resetPassword(@RequestParam String email, @RequestParam String newPassword) {
        Optional<Customer> userOptional = customerRepository.findByEmail(email);
        if (userOptional.isPresent()) {
        Customer user = userOptional.get();
        user.setPassword(passwordEncoder.encode(newPassword)); // Encode the new password
        user.setOtp(null); // Clear OTP after successful password reset
        customerRepository.save(user);
        return "Password reset successfully!";
    }
    return "User not found!";
}


@GetMapping("/pricePerKm/{catModel}")
public String getPricePerKm(@PathVariable String catModel) {
    return service.getPricePerKmByCatModel(catModel);
}

}
