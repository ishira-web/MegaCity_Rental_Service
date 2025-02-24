package com.cabservice.megacity.Service;

import com.cabservice.megacity.Model.Customer;
import com.cabservice.megacity.Repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // Get all customers
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Get customer by ID
    public Customer getCustomerById(Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        return customer.orElse(null); // Return null if customer is not found
    }

    // Get customer by email
    public Customer getCustomerByEmail(String email) {
        return customerRepository.findByEmail(email).orElse(null); // Return null if customer is not found
    }

    // Get customers by name
    public List<Customer> getCustomersByName(String name) {
        return customerRepository.findByNameContainingIgnoreCase(name); // Case-insensitive search
    }

    // Create a new customer
    public Customer createCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    // Update customer by ID
    public Customer updateCustomer(Customer customer) {
        if (customerRepository.existsById(customer.getId())) {
            return customerRepository.save(customer);
        } else {
            return null; // Return null if customer is not found
        }
    }

    // Delete customer by ID
    public boolean deleteCustomer(Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return true; // Return true if deletion is successful
        } else {
            return false; // Return false if customer is not found
        }
    }
}