package com.cabservice.megacity.Controller;

import java.io.IOException;
import java.util.ArrayList;
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
    public Driver createDriver(
            @RequestParam("imageUrl") MultipartFile imageUrl,
            @RequestParam("carImageUrls") MultipartFile[] carImageUrls,
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
            @RequestParam("luggageType") String luggageType
    ) throws IOException, MessagingException {
        // Upload driver photo to Cloudinary
        String driverPhotoUrl = cloudinaryService.uploadImage(imageUrl);

        // Upload car photos to Cloudinary
        List<String> carPhotoUrls = new ArrayList<>();
        for (MultipartFile carPhoto : carImageUrls) {
            String carPhotoUrl = cloudinaryService.uploadImage(carPhoto);
            carPhotoUrls.add(carPhotoUrl);
        }

        // Create and populate the Driver object
        Driver driver = new Driver();
        driver.setDriverName(driverName);
        driver.setDriverEmail(driverEmail);
        driver.setUserName(userName);
        driver.setImageUrl(driverPhotoUrl);
        driver.setPassword(passwordEncoder.encode(password));
        driver.setDriverAddress(driverAddress);
        driver.setDriverPhone(driverPhone);
        driver.setDriverStatues("Pending"); // Set status to Pending
        driver.setCurrentLocation(currentLocation);
        driver.setCatID(catID);
        driver.setCatType(catType);
        driver.setCatModel(catModel);
        driver.setNoOfSeats(noOfSeats);
        driver.setLagguageType(luggageType);
        driver.setCarImageUrls(carPhotoUrls);

        emailService.sendThankYouEmail(driverEmail, driverName);
        return service.createDriver(driver);
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
    @PutMapping("/auth/banDriver/{driverID}")
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
    @GetMapping("/availableDrivers")
    public ResponseEntity<List<Driver>> getAvailableDrivers() {
        return ResponseEntity.ok(service.getDriversByStatus("Available"));
    }

    /**
     * Retrieves all drivers.
     */
    @GetMapping("/getAllDriver")
    public ResponseEntity<List<Driver>> getAllDrivers() {
        return ResponseEntity.ok(service.getAllDrivers());
    }

    /**
     * Retrieves a driver by ID.
     */
    @GetMapping("/driver/{driverID}")
    public ResponseEntity<Driver> getDriverById(@PathVariable String driverID) {
        Driver driver = service.getDriverByID(driverID);
        return driver != null ? ResponseEntity.ok(driver) : ResponseEntity.notFound().build();
    }

    /**
     * Updates a driver.
     */
    @PutMapping("/updateDriver/{driverID}")
    public ResponseEntity<Driver> updateDriver(@PathVariable String driverID, @RequestBody Driver updatedDriver) {
        Driver driver = service.updateDriver(driverID, updatedDriver);
        return driver != null ? ResponseEntity.ok(driver) : ResponseEntity.notFound().build();
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

}
