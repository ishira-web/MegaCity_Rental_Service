package com.cabservice.megacity.Service;

import com.cabservice.megacity.Model.Driver;
import com.cabservice.megacity.Repository.DriverRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    // Get Driver by ID
    public Driver getDriverByID(String driverID) {
        return driverRepository.findById(driverID).orElse(null);
    }

    // Get Driver by Email
    public Driver getDriverByEmail(String driverEmail) {
        return driverRepository.findByDriverEmail(driverEmail);
    }

    // Get Driver by Username
    public Optional<Driver> getDriverByUsername(String username) {
        return driverRepository.findByUserName(username);
    }

    // Create a new Driver
    public void createDriver(Driver driver) {
        driverRepository.save(driver);
    }

    // Approve Driver and set status to "Available"
    public Driver approveDriver(String driverID) {
        Driver driver = getDriverByID(driverID);
        if (driver != null) {
            driver.setDriverStatues("Available");
            driverRepository.save(driver);
            return driver;
        }
        return null;
    }

    // Ban Driver and set status to "Banned"
    public boolean banDriver(String driverID) {
        Driver driver = getDriverByID(driverID);
        if (driver != null) {
            driver.setDriverStatues("Banned");
            driverRepository.save(driver);
            return true;
        }
        return false;
    }

    // Decline Driver and set status to "Declined"
    public boolean declineDriver(String driverID) {
        Driver driver = getDriverByID(driverID);
        if (driver != null) {
            driver.setDriverStatues("Declined");
            driverRepository.save(driver);
            return true;
        }
        return false;
    }

    // Get all drivers with a specific status
    public List<Driver> getDriversByStatus(String status) {
        return driverRepository.findByDriverStatues(status);
    }

    // Update a Driver's details
    public Driver updateDriver(String driverID, Driver updatedDriver) {
        Driver driver = getDriverByID(driverID);
        if (driver != null) {
            driver.setDriverName(updatedDriver.getDriverName());
            driver.setDriverStatues(updatedDriver.getDriverStatues()); // Ensure status is updated
            driver.setDriverPhone(updatedDriver.getDriverPhone());
            driver.setDriverAddress(updatedDriver.getDriverAddress());
            driver.setCurrentLocation(updatedDriver.getCurrentLocation());
            driver.setVehicalNumber(updatedDriver.getVehicalNumber());
            driver.setCatID(updatedDriver.getCatID());
            driver.setCatModel(updatedDriver.getCatModel());
            driver.setAcType(updatedDriver.getAcType());
            driver.setLagguageType(updatedDriver.getLagguageType());
            driver.setNoOfSeats(updatedDriver.getNoOfSeats());
            driver.setCarImageUrls(updatedDriver.getCarImageUrls());
            driverRepository.save(driver);
            return driver;
        }
        return null;
    }

    // Delete a Driver
    public boolean deleteDriver(String driverID) {
        Driver driver = getDriverByID(driverID);
        if (driver != null) {
            driverRepository.delete(driver);
            return true;
        }
        return false;
    }
}
