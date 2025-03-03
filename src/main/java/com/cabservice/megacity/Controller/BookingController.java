package com.cabservice.megacity.Controller;
import com.cabservice.megacity.Model.Booking;
import com.cabservice.megacity.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Create a booking
    @PostMapping("/auth/createBooking")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking createdBooking = bookingService.createBooking(booking);
        if (createdBooking != null) {
            return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // Driver unavailable
        }
    }
    
    // Delete a booking by booking ID
    @DeleteMapping("/delete/{bookingId}")
    public ResponseEntity<String> deleteBooking(@PathVariable String bookingId) {
        boolean isDeleted = bookingService.deleteBooking(bookingId);
        if (isDeleted) {
            return new ResponseEntity<>("Booking deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Booking not found", HttpStatus.NOT_FOUND);
        }
    }

    // Get driver by booking ID
    @GetMapping("/auth/driver/{bookingId}")
    public ResponseEntity<String> getDriverByBookingId(@PathVariable String bookingId) {
        Optional<String> driverId = bookingService.getDriverByBookingId(bookingId);
        return driverId.map(s -> new ResponseEntity<>(s, HttpStatus.OK))
                       .orElseGet(() -> new ResponseEntity<>("Driver not found", HttpStatus.NOT_FOUND));
    }

    // Get bookings by customer ID
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Booking>> getBookingsByCustomerId(@PathVariable String customerId) {
        List<Booking> bookings = bookingService.getBookingsByCustomerId(customerId);
        if (!bookings.isEmpty()) {
            return new ResponseEntity<>(bookings, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Confirm booking
    @PutMapping("/auth/confirm/{bookingId}")
    public ResponseEntity<String> confirmBooking(@PathVariable String bookingId) {
        bookingService.confirmBooking(bookingId);
        return new ResponseEntity<>("Booking confirmed", HttpStatus.OK);
    }

    // End trip and make driver available
    @PutMapping("/end/{bookingId}")
    public ResponseEntity<String> endTrip(@PathVariable String bookingId) {
        bookingService.endTrip(bookingId);
        return new ResponseEntity<>("Trip ended, driver is now available", HttpStatus.OK);
    }
}
