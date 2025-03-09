package com.cabservice.megacity.Controller;

import com.cabservice.megacity.Model.Booking;
import com.cabservice.megacity.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController

public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Create a booking
    @PostMapping("/auth/booking/create")
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {
        try {
            Booking createdBooking = bookingService.createBooking(booking);
            if (createdBooking != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdBooking);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Driver unavailable", "Unable to create booking"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Booking creation failed", e.getMessage()));
        }
    }
    
    // Delete a booking by booking ID
    @DeleteMapping("auth/booking/delete/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable String bookingId) {
        try {
            boolean isDeleted = bookingService.deleteBooking(bookingId);
            if (isDeleted) {
                return ResponseEntity.ok(new SuccessResponse("Booking deleted successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Booking not found", "No booking exists with the given ID"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Deletion failed", e.getMessage()));
        }
    }

    // Get driver by booking ID
    @GetMapping("/auth/driver/{bookingId}")
    public ResponseEntity<?> getDriverByBookingId(@PathVariable String bookingId) {
        try {
            Optional<String> driverID = bookingService.getDriverByBookingId(bookingId);
            
            if (driverID.isPresent()) {
                return ResponseEntity.ok(Map.of("driverID", driverID.get()));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Driver not found", "No driver associated with this booking"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Driver fetch failed", e.getMessage()));
        }
    }

    // Get bookings by customer ID
    @GetMapping("/auth/customer/{customerId}")
    public ResponseEntity<?> getBookingsByCustomerId(@PathVariable String customerId) {
        try {
            List<Booking> bookings = bookingService.getBookingsByCustomerId(customerId);
            if (!bookings.isEmpty()) {
                return ResponseEntity.ok(bookings);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("No bookings found", "No bookings exist for this customer"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Booking fetch failed", e.getMessage()));
        }
    }

    // Confirm booking
    @PostMapping("/auth/confirm/{bookingId}")
    public ResponseEntity<?> confirmBooking(@PathVariable String bookingId) {
        try {
            boolean confirmed = bookingService.confirmBooking(bookingId);
            if (confirmed) {
                return ResponseEntity.ok(new SuccessResponse("Booking confirmed successfully"));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Confirmation failed", "Unable to confirm booking"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Booking confirmation failed", e.getMessage()));
        }
    }

    // End trip and make driver available
    @PostMapping("/auth/end/{bookingId}")
    public ResponseEntity<?> endTrip(@PathVariable String bookingId) {
        try {
            boolean ended = bookingService.endTrip(bookingId);
            if (ended) {
                return ResponseEntity.ok(new SuccessResponse("Trip ended, driver is now available"));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Trip end failed", "Unable to end trip"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Trip end process failed", e.getMessage()));
        }
    }

    //Get All Bookings
    @GetMapping("/auth/bookings")
    public ResponseEntity<?> getAllBookings() {
        try {
            List<Booking> bookings = bookingService.getAllBookings();
            if (!bookings.isEmpty()) {
                return ResponseEntity.ok(bookings);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("No bookings found", "No bookings exist"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Booking fetch failed", e.getMessage()));
        }
    }



        @GetMapping("/auth/booking/totalFare")
    public BigDecimal getTotalFare() {
        return bookingService.getTotalFare();
    }

    // Helper response classes              
    public static class SuccessResponse {            
        private String message;

        public SuccessResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }

    public static class ErrorResponse {
        private String title;
        private String detail;

        public ErrorResponse(String title, String detail) {
            this.title = title;
            this.detail = detail;
        }

        public String getTitle() {
            return title;
        }

        public String getDetail() {
            return detail;
        }
    }

    public static class DriverResponse {
        private String driverID;

        public DriverResponse(String driverId) {
            this.driverID = driverID;
        }

        public String getDriverId() {
            return driverID;
        }
    }


    // Get Booking by Driver ID
    @GetMapping("/auth/driver/booking/{driverID}")
    public ResponseEntity<?> getBookingByDriverId(@PathVariable String driverID) {
        try {
            List<Booking> bookings = bookingService.getBookingsByDriverId(driverID);
            if (!bookings.isEmpty()) {
                return ResponseEntity.ok(bookings);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("No bookings found", "No bookings exist for this driver"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Booking fetch failed", e.getMessage()));
        }
    }
}