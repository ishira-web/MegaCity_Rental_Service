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
    

    // Update a Driver
    public Driver updateDriver(String driverID, Driver updatedDriver) {
        Driver driver = getDriverByID(driverID);
        if (driver != null) {
            if (updatedDriver.getDriverName() != null) {
                driver.setDriverName(updatedDriver.getDriverName());
            }
            if (updatedDriver.getDriverStatues() != null) {
                driver.setDriverStatues(updatedDriver.getDriverStatues());
            }
            if (updatedDriver.getDriverPhone() != null) {
                driver.setDriverPhone(updatedDriver.getDriverPhone());
            }
            if (updatedDriver.getDriverAddress() != null) {
                driver.setDriverAddress(updatedDriver.getDriverAddress());
            }
            if (updatedDriver.getCurrentLocation() != null) {
                driver.setCurrentLocation(updatedDriver.getCurrentLocation());
            }
            if (updatedDriver.getVehicalNumber() != null) {
                driver.setVehicalNumber(updatedDriver.getVehicalNumber());
            }
            if (updatedDriver.getCatID() != null) {
                driver.setCatID(updatedDriver.getCatID());
            }
            if (updatedDriver.getCatModel() != null) {
                driver.setCatModel(updatedDriver.getCatModel());
            }
            if (updatedDriver.getAcType() != null) {
                driver.setAcType(updatedDriver.getAcType());
            }
            if (updatedDriver.getLagguageType() != null) {
                driver.setLagguageType(updatedDriver.getLagguageType());
            }
            if (updatedDriver.getNoOfSeats() != null) {
                driver.setNoOfSeats(updatedDriver.getNoOfSeats());
            }
            if (updatedDriver.getCarImageUrl() != null) {
                driver.setCarImageUrl(updatedDriver.getCarImageUrl());
            }
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


    // Get All Pending Drivers
public List<Driver> getAllPendingDrivers() {
    return driverRepository.findByDriverStatues("Pending");
}


// Get Driver by ID
public Driver getDriverByID(String driverID) {
    return driverRepository.findById(driverID).orElse(null);
}


// DriverService.java

public Driver getPendingDriverById(String driverID) {
    Driver driver = getDriverByID(driverID);
    if (driver != null && "Pending".equalsIgnoreCase(driver.getDriverStatues())) {
        return driver;
    }
    return null;
}

// Get All Drivers
public List<Driver> getAllDrivers() {
    return driverRepository.findAll();

}
}
