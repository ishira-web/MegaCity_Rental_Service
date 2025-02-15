package com.cabservice.megacity.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cabservice.megacity.Model.Driver;
import com.cabservice.megacity.Repository.DriverRepository;

@Service
public class DriverService {
    
     @Autowired
    private DriverRepository driverRepository;

    //Create Driver
    public Driver createDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    //Get All Drivers
    public List<Driver> getAllDrivers(){
        return driverRepository.findAll();
    }

    //Get Drivers By ID
    public  Driver getDriverByID(String driverID){
        return driverRepository.findById(driverID).get();
    }

    //Delete Driver
    public String deleteDriverByID(String driverID){
        driverRepository.deleteById(driverID);
        return driverID+"Driver Deleted Successfully";
    }

    //Get Driver By Category ID
    public List<Driver> getDriversByCategoryId(String catID) {
        List<Driver> driver = driverRepository.findByCatID(catID);
        System.out.println("Searching for drivers with catID: " + catID);
        System.out.println("Found drivers: " + driver);
        return driver;
    }

    // Update Driver
    public Driver updateDriver(String driverID, Driver updatedDriver) {
        Driver existingDriver = driverRepository.findById(driverID)
                .orElseThrow();

        // Update all fields
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

}
