package com.cabservice.megacity.Controller;

import java.io.IOException;
import java.util.List;

import com.cabservice.megacity.Service.EmailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;
import com.cabservice.megacity.Model.Driver;
import com.cabservice.megacity.Service.CloudinaryService;
import com.cabservice.megacity.Service.DriverService;

@CrossOrigin(origins = "*")
@RestController
public class DriverController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private DriverService service;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;



    /**
     * Creates a new driver (Pending status by default)
     */
    @PostMapping("/auth/createDriver")
    public ResponseEntity<String> createDriver(
            @RequestParam("imageUrl") MultipartFile imageUrl,
            @RequestParam("carImageUrl") MultipartFile carImageUrl, 
            @RequestParam("driverName") String driverName,
            @RequestParam("driverEmail") String driverEmail,
            @RequestParam("userName") String userName,
            @RequestParam("password") String password,
            @RequestParam("driverAddress") String driverAddress,
            @RequestParam("driverPhone") String driverPhone,
            @RequestParam("currentLocation") String currentLocation,
            @RequestParam("catID") String catID,
            @RequestParam("catType") String catType,
            @RequestParam("catModel") String catModel,
            @RequestParam("noOfSeats") String noOfSeats,
            @RequestParam("driverNic") String driverNic,
            @RequestParam("acType") String acType,
            @RequestParam("lagguageType") String lagguageType,
            @RequestParam("vehicalNumber") String vehicalNumber
    ) throws IOException, MessagingException {

        // Check if a driver with this email already exists
        Driver existingDriverByEmail = service.getDriverByEmail(driverEmail);
        if (existingDriverByEmail != null) {
            if ("Banned".equalsIgnoreCase(existingDriverByEmail.getDriverStatues())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("This email is banned. You cannot create a new account.");
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).body("An account with this email already exists.");
        }

        // Check if the username is already taken
        if (service.getDriverByUsername(userName).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("This username is already taken. Please choose a different one.");
        }

        // Upload driver photo to Cloudinary
        String driverPhotoUrl = cloudinaryService.uploadImage(imageUrl);

        // Upload car photo to Cloudinary (only one image)
        String carPhotoUrl = cloudinaryService.uploadImage(carImageUrl);

        // Create and populate the Driver object
        Driver driver = new Driver();
        driver.setDriverName(driverName);
        driver.setDriverEmail(driverEmail);
        driver.setUserName(userName);
        driver.setImageUrl(driverPhotoUrl);
        driver.setPassword(passwordEncoder.encode(password));
        driver.setDriverAddress(driverAddress);
        driver.setDriverPhone(driverPhone);
        driver.setDriverStatues("Pending"); // Default status is Pending
        driver.setCurrentLocation(currentLocation);
        driver.setCatID(catID);
        driver.setAcType(acType);
        driver.setDriverNic(driverNic);
        driver.setCatType(catType);
        driver.setLagguageType(lagguageType);
        driver.setCatModel(catModel);
        driver.setVehicalNumber(vehicalNumber);
        driver.setCarImageUrl(carPhotoUrl); // Change here to set a single URL

        // Save driver
        service.createDriver(driver);
        return ResponseEntity.ok("Driver account created successfully.");
    }


    /**
     * Approves a driver (Admin action)
     */
    @PutMapping("/auth/approveDriver/{driverID}")
    public ResponseEntity<Driver> approveDriver(@PathVariable String driverID) throws MessagingException {
        Driver updatedDriver = service.approveDriver(driverID);
        if (updatedDriver != null) {
            // Send Registration Success Email if the driver status is "Available"
            if ("Available".equalsIgnoreCase(updatedDriver.getDriverStatues())) {
                emailService.sendThankYouEmail(updatedDriver.getDriverEmail(), updatedDriver.getDriverName());
            }
            return ResponseEntity.ok(updatedDriver);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    /**
     * Declines a driver (Admin action)
     */
    @DeleteMapping("/auth/declineDriver/{driverID}")
    public ResponseEntity<String> declineDriver(@PathVariable String driverID) throws MessagingException {
        Driver declinedDriver = service.getDriverByID(driverID);
        if (declinedDriver != null) {
            boolean isDeleted = service.declineDriver(driverID);
            if (isDeleted) {
                // Send Rejection Email
                emailService.sendRejectionEmail(declinedDriver.getDriverEmail(), declinedDriver.getDriverName());
                return ResponseEntity.ok("Driver declined and removed successfully.");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Driver not found.");
    }

    /**
     * Bans a driver (Admin action)
     */
    @PutMapping("/banDriver/{driverID}")
    public ResponseEntity<String> banDriver(@PathVariable String driverID) throws MessagingException {
        Driver bannedDriver = service.getDriverByID(driverID);
        if (bannedDriver != null) {
            bannedDriver.setDriverStatues("Banned");
            service.updateDriver(driverID, bannedDriver);

            // Send Ban Notification Email
            emailService.sendBanNotificationEmail(bannedDriver.getDriverEmail(), bannedDriver.getDriverName());

            return ResponseEntity.ok("Driver has been banned successfully.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Driver not found.");
    }

    /**
     * Retrieves all available drivers.
     */
    @GetMapping("/auth/availableDrivers")
    public ResponseEntity<List<Driver>> getAvailableDrivers() {
        return ResponseEntity.ok(service.getDriversByStatus("Available"));
    }
    

    /**
     * Retrieves all drivers.
     */
    @GetMapping("/auth/allDrivers")
    public ResponseEntity<List<Driver>> getAllDrivers() {
        return ResponseEntity.ok(service.getAllDrivers());
    }


    /**
     * Updates a driver.
     */
    // Endpoint to update a driver's details
    @PutMapping("/auth/updatedriver/{driverID}")
    public ResponseEntity<Driver> updateDriver(
            @PathVariable String driverID,
            @RequestBody Driver updatedDriver) {
        
        // Call the service method to update the driver
        Driver driver = service.updateDriver(driverID, updatedDriver);
        
        if (driver != null) {
            // Return the updated driver with HTTP 200 OK
            return ResponseEntity.ok(driver);
        } else {
            // If the driver is not found, return HTTP 404 Not Found
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Deletes a driver (Admin action)
     */
    @DeleteMapping("/auth/deleteDriver/{driverID}")
    public ResponseEntity<String> deleteDriver(@PathVariable String driverID) throws MessagingException {
        Driver driver = service.getDriverByID(driverID);
        if (driver != null) {
            boolean isDeleted = service.deleteDriver(driverID);
            if (isDeleted) {
                // Send Driver Deletion Email
                emailService.sendDriverDeletionEmail(driver.getDriverEmail(), driver.getDriverName());
                return ResponseEntity.ok("Driver has been deleted successfully.");
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Driver not found.");
    }


    // Get All Pending Drivers
    @GetMapping("/auth/drivers/pending")
    public ResponseEntity<List<Driver>> getPendingDrivers() {
    List<Driver> pendingDrivers = service.getAllPendingDrivers();
    return ResponseEntity.ok(pendingDrivers);
}


@GetMapping("/auth/driverByID/{driverID}")
public ResponseEntity<Driver> getDriverById(@PathVariable String driverID) {
    Driver driver = service.getDriverByID(driverID);
    return driver != null ? ResponseEntity.ok(driver) : ResponseEntity.notFound().build();
}


      // DriverController.java

@GetMapping("/auth/drivers/pending/{driverID}")
public ResponseEntity<Driver> getPendingDriverById(@PathVariable String driverID) {
    Driver driver = service.getPendingDriverById(driverID);
    if (driver != null) {
        return ResponseEntity.ok(driver);
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
}
