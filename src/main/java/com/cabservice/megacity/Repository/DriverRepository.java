package com.cabservice.megacity.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.cabservice.megacity.Model.Driver;

@Repository
public interface DriverRepository extends MongoRepository<Driver, String> {
    Optional<Driver> findByUserName(String userName);
    List<Driver> findByCatID(String catID);
    List<Driver> findByDriverStatues(String status);
    Driver findByDriverEmail(String email);
}