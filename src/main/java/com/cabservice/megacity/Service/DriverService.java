package com.cabservice.megacity.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cabservice.megacity.Model.Driver;
import com.cabservice.megacity.Repository.DriverRepository;
import jakarta.mail.MessagingException;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private EmailService emailService;

    // Create Driver (Default status: Pending)
    public Driver createDriver(Driver driver) {
        driver.setDriverStatues("Pending"); // Set status to Pending
        return driverRepository.save(driver);
    }

    // Get All Drivers
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    // Get Driver By ID
    public Driver getDriverByID(String driverID) {
        return driverRepository.findById(driverID).orElse(null);
    }

    // Delete Driver
    public String deleteDriverByID(String driverID) {
        driverRepository.deleteById(driverID);
        return driverID + " Driver Deleted Successfully";
    }

    // Get Driver By Category ID
    public List<Driver> getDriversByCategoryId(String catID) {
        return driverRepository.findByCatID(catID);
    }

    // Get Drivers By Status
    public List<Driver> getDriversByStatus(String status) {
        return driverRepository.findByDriverStatues(status);
    }

    // Approve Driver (Admin)
    public Driver approveDriver(String driverID) {
        Driver driver = driverRepository.findById(driverID).orElse(null);
        if (driver != null) {
            driver.setDriverStatues("Available"); // Change status to Available
            return driverRepository.save(driver);
        }
        return null;
    }

    // Decline Driver (Admin)
    public boolean declineDriver(String driverID) throws MessagingException {
        Driver driver = driverRepository.findById(driverID).orElse(null);
        if (driver != null) {
            driverRepository.delete(driver); // Remove from database
            emailService.sendRejectionEmail(driver.getDriverEmail(), driver.getDriverName()); // Notify driver
            return true;
        }
        return false;
    }

    // Update Driver
    public Driver updateDriver(String driverID, Driver updatedDriver) {
        Driver existingDriver = driverRepository.findById(driverID).orElse(null);
        if (existingDriver != null) {
            existingDriver.setDriverName(updatedDriver.getDriverName());
            existingDriver.setDriverAddress(updatedDriver.getDriverAddress());
            existingDriver.setDriverPhone(updatedDriver.getDriverPhone());
            existingDriver.setDriverEmail(updatedDriver.getDriverEmail());
            existingDriver.setUserName(updatedDriver.getUserName());
            existingDriver.setPassword(updatedDriver.getPassword());
            existingDriver.setDriverStatues(updatedDriver.getDriverStatues());
            existingDriver.setCurrentLocation(updatedDriver.getCurrentLocation());

            return driverRepository.save(existingDriver);
        }
        return null;
    }

    public boolean deleteDriver(String driverID) {
        Optional<Driver> driverOptional = driverRepository.findById(driverID);
    
        if (driverOptional.isPresent()) {
            driverRepository.deleteById(driverID);
            return true; // Successfully deleted
        }
    
        return false; // Driver not found
    }
    
}
