package com.cabservice.megacity.Service;

import com.cabservice.megacity.Model.Booking;
import com.cabservice.megacity.Model.Driver;
import com.cabservice.megacity.Repository.BoookingRepository;
import com.cabservice.megacity.Repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BoookingRepository bookingRepository;

    @Autowired
    private DriverRepository driverRepository;

    // Create a new booking
    public Booking createBooking(Booking booking) {
        // Check if the driver is available for the selected time and date
        boolean isDriverAvailable = checkDriverAvailability(
            booking.getDriverID(), 
            booking.getBookingDate(), 
            booking.getBookingTime()
        );
        
        if (isDriverAvailable) {
            // Set the status of the booking to "Pending" until the driver confirms
            booking.setBookingStatus("Pending");
            return bookingRepository.save(booking);
        } else {
            // Return null or throw an exception if driver is not available
            throw new RuntimeException("Driver is not available for the selected time");
        }
    }

    // Confirm booking and update driver status
    public boolean confirmBooking(String bookingId) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            
            // Find the driver associated with the booking
            Optional<Driver> driverOptional = driverRepository.findById(booking.getDriverID());
            
            if (driverOptional.isPresent()) {
                Driver driver = driverOptional.get();
                
                // Update booking status
                booking.setBookingStatus("Confirmed");
                bookingRepository.save(booking);
                
                // Update driver status to unavailable
                driver.setDriverStatues("Unavailable");
                driverRepository.save(driver);
                
                return true;
            }
        }
        
        return false;
    }

    // End trip and make driver available again
    public boolean endTrip(String bookingId) {
        Optional<Booking> bookingOptional = bookingRepository.findById(bookingId);
        
        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();
            
            // Find the driver associated with the booking
            Optional<Driver> driverOptional = driverRepository.findById(booking.getDriverID());
            
            if (driverOptional.isPresent()) {
                Driver driver = driverOptional.get();
                
                // Update booking status
                booking.setBookingStatus("Completed");
                bookingRepository.save(booking);
                
                // Make driver available again
                driver.setDriverStatues("Available");
                driverRepository.save(driver);
                
                return true;
            }
        }
        
        return false;
    }

    // Helper method to check driver availability 
    private boolean checkDriverAvailability(String driverId, String bookingDate, String bookingTime) {
        Optional<Driver> driverOptional = driverRepository.findById(driverId);
        
        if (driverOptional.isPresent()) {
            Driver driver = driverOptional.get();
            
            // Check if driver is currently available
            return "Available".equals(driver.getDriverStatues());
        }
        
        return false;
    }

    // Get bookings by customer ID
    public List<Booking> getBookingsByCustomerId(String customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    // Delete a booking by its ID
    public boolean deleteBooking(String bookingId) {
        Optional<Booking> booking = bookingRepository.findById(bookingId);
        if (booking.isPresent()) {
            bookingRepository.delete(booking.get());
            return true;
        } else {
            return false;
        }
    }

    // Get driver by booking ID
    public Optional<String> getDriverByBookingId(String bookingId) {
        Optional<Booking> booking = bookingRepository.findById(bookingId);
        if (booking.isPresent()) {
            return Optional.of(booking.get().getDriverID());
        }
        return Optional.empty();
    }

    // Additional method to get available drivers
    public List<Driver> getAvailableDrivers() {
        return driverRepository.findByDriverStatues("Available");
    }


    // Get All Bookings
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }



     // Method to get the total fare of all completed bookings
     public BigDecimal getTotalFare() {
        List<Booking> completedBookings = bookingRepository.findByBookingStatus("Completed");

        return completedBookings.stream()
                .map(booking -> {
                    try {
                        return new BigDecimal(booking.getFare());
                    } catch (NumberFormatException e) {
                        return BigDecimal.ZERO; // Handle cases where fare is not a valid number
                    }
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }


    // Get  Bookings by Driver ID
    public List<Booking> getBookingsByDriverId(String driverID) {
        return bookingRepository.findByDriverID(driverID);
    }
}