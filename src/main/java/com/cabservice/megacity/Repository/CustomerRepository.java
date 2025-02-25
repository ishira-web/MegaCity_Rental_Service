package com.cabservice.megacity.Repository;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.cabservice.megacity.Model.Customer;

@Repository
public interface CustomerRepository extends MongoRepository<Customer, String> {

    Optional<Customer> findByUserName(String userName);
    Optional<Customer>findByEmail(String email);


}
