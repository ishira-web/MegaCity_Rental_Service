package com.cabservice.megacity.Service;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cabservice.megacity.Model.Customer;
import com.cabservice.megacity.Repository.CustomerRepository;



@Service
public class CustomerService {
 
     @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    public Optional<Customer> findById(String id) {
        return customerRepository.findById(id);
    }

    public Customer create(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer update(String id, Customer customer) {
        customer.setCustomerId(id);
        return customerRepository.save(customer);
    }

    public void delete(String id) {
        customerRepository.deleteById(id);
    }
    
}
