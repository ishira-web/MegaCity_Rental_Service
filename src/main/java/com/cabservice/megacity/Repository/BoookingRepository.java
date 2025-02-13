package com.cabservice.megacity.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.cabservice.megacity.Model.Booking;

public interface BoookingRepository extends MongoRepository<Booking, String> {
   
    
    
}
