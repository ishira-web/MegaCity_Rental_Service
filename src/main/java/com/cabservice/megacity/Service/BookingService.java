package com.cabservice.megacity.Service;
import com.cabservice.megacity.Model.Booking;
import com.cabservice.megacity.Repository.BoookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BoookingRepository bookingRepository;

    // Create a new booking
    public Booking createBooking(Booking booking) {
        // Check if the driver is available for the selected time and date
        // This logic assumes we have a method for checking availability which could be done via the driver entity/model
        boolean isDriverAvailable = checkDriverAvailability(booking.getDriverID(), booking.getBookingDate(), booking.getBookingTime());
        if (isDriverAvailable) {
            // Set the status of the booking to "Pending" until the driver confirms
            booking.setBookingStatus("Pending");
            return bookingRepository.save(booking);
        } else {
            // Return null or throw an exception if driver is not available
            return null;
        }
    }

    // Delete a booking by its ID
    public boolean deleteBooking(String bookingId) {
        Optional<Booking> booking = bookingRepository.findByBookingId(bookingId);
        if (booking.isPresent()) {
            bookingRepository.delete(booking.get());
            return true;
        } else {
            return false;
        }
    }

    // Get driver by booking ID
    public Optional<String> getDriverByBookingId(String bookingId) {
        Optional<Booking> booking = bookingRepository.findByBookingId(bookingId);
        if (booking.isPresent()) {
            return Optional.of(booking.get().getDriverID());
        }
        return Optional.empty();
    }

    // Get bookings by customer ID
    public List<Booking> getBookingsByCustomerId(String customerId) {
        return bookingRepository.findByCustomerID(customerId);
    }

    // Helper method to check driver availability (you need to implement the actual check logic)
    private boolean checkDriverAvailability(String driverId, String bookingDate, String bookingTime) {
        // Implement the logic to check driver availability for the given date and time
        // For example, query the driver database to see if they are available
        return true; // Just a placeholder, implement real logic
    }

    // Method to confirm the booking, change driver availability to unavailable
    public void confirmBooking(String bookingId) {
        Optional<Booking> booking = bookingRepository.findByBookingId(bookingId);
        if (booking.isPresent()) {
            Booking b = booking.get();
            b.setBookingStatus("Confirmed");
            // Update the driver status to unavailable in the system (not shown here, you should update the driver entity)
            bookingRepository.save(b);
        }
    }

    // Method to end the trip and make the driver available again
    public void endTrip(String bookingId) {
        Optional<Booking> booking = bookingRepository.findByBookingId(bookingId);
        if (booking.isPresent()) {
            Booking b = booking.get();
            b.setBookingStatus("Completed");
            // Update the driver status to available in the system (not shown here, you should update the driver entity)
            bookingRepository.save(b);
        }
    }
}
