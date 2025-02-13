package com.cabservice.megacity.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import com.cabservice.megacity.Model.Driver;
import com.cabservice.megacity.Service.DriverService;

@RestController
@RequestMapping("/drivers")
public class DriverController {
    
    @Autowired
    private DriverService service;

    /**
     * Creates a new driver.
     * @param driver The driver details received in the request body.
     * @return The created driver.
     */

     
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Driver createDriver(@RequestBody Driver driver) {
        return service.createDriver(driver);
    }

    /**
     * Retrieves a driver by their ID.
     * @param driverID The ID of the driver to retrieve.
     * @return The driver details.
     */


    @GetMapping("/{driverID}")
    public Driver getDriver(@PathVariable String driverID) {
        return service.getDriverByID(driverID);
    }

    /**
     * Deletes a driver by their ID.
     * @param driverID The ID of the driver to delete.
     * @return A message indicating whether the deletion was successful.
     */


    @DeleteMapping("/{driverID}")
    public String deleteDriver(@PathVariable String driverID) {
        return service.deleteDriverByID(driverID);
    }

    /**
     * Retrieves a list of drivers based on category ID.
     * @param catID The category ID to filter drivers.
     * @return A list of drivers belonging to the specified category.
     */


    @GetMapping("/category/{catID}")
    public List<Driver> getDriversByCategoryId(@PathVariable String catID) {
        System.out.println("Received request for drivers with catID: " + catID);
        return service.getDriversByCategoryId(catID);
    }

    /**
     * Updates an existing driver.
     * @param driverID The ID of the driver to update.
     * @param updatedDriver The updated driver details.
     * @return The updated driver information wrapped in a ResponseEntity.
     */


    @PutMapping("/{driverID}")
    public ResponseEntity<Driver> updateDriver(@PathVariable String driverID, @RequestBody Driver updatedDriver) {
        Driver driver = service.updateDriver(driverID, updatedDriver);
        return ResponseEntity.ok(driver);
    }
}
