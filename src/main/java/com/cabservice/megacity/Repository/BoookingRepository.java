package com.cabservice.megacity.Repository;
import com.cabservice.megacity.Model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface BoookingRepository extends MongoRepository<Booking, String> {
    // Custom method to find bookings by customer ID
    List<Booking> findByCustomerID(String customerID);

    // Custom method to find a booking by its ID
    Optional<Booking> findByBookingId(String bookingId);
}