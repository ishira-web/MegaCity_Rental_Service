package com.cabservice.megacity.Controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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

    /**
     * Creates a new driver.
     * @param driverPhoto The driver photo file.
     * @param carPhotos The car photo files.
     * @param driverName The driver's name.
     * @param driverEmail The driver's email.
     * @param userName The driver's username.
     * @param password The driver's password.
     * @param driverAddress The driver's address.
     * @param driverPhone The driver's phone number.
     * @param driverStatues The driver's status.
     * @param currentLocation The driver's current location.
     * @param catID The category ID of the driver's vehicle.
     * @param catType The type of the driver's vehicle.
     * @param catModel The model of the driver's vehicle.
     * @param noOfSeats The number of seats in the driver's vehicle.
     * @param lagguageType The luggage type of the driver's vehicle.
     * @return The created driver.
     */
    @PostMapping("/auth/createDriver")
public Driver createDriver(
    @RequestParam("driverPhoto") MultipartFile driverPhoto,
    @RequestParam("carPhotos") MultipartFile[] carPhotos,
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
    @RequestParam("lagguageType") String lagguageType
) throws IOException {
    // Upload driver photo to Cloudinary
    String driverPhotoUrl = cloudinaryService.uploadImage(driverPhoto);

    // Upload car photos to Cloudinary
    List<String> carPhotoUrls = new ArrayList<>();
    for (MultipartFile carPhoto : carPhotos) {
        String carPhotoUrl = cloudinaryService.uploadImage(carPhoto);
        carPhotoUrls.add(carPhotoUrl);
    }

    // Create and populate the Driver object
    Driver driver = new Driver();
    driver.setDriverName(driverName);
    driver.setDriverEmail(driverEmail);
    driver.setUserName(userName);
    driver.setImageUrl(driverPhotoUrl); // Set driver photo URL
    driver.setPassword(passwordEncoder.encode(password)); // Encrypt password
    driver.setDriverAddress(driverAddress);
    driver.setDriverPhone(driverPhone);
    driver.setDriverStatues("Available"); // Automatically set status to "Available"
    driver.setCurrentLocation(currentLocation);
    driver.setCatID(catID);
    driver.setCatType(catType);
    driver.setCatModel(catModel);
    driver.setNoOfSeats(noOfSeats);
    driver.setLagguageType(lagguageType);
    driver.setCarImageUrls(carPhotoUrls); // Set car photo URLs

    // Save the driver to the database
    return service.createDriver(driver);
}

    /**
     * Retrieves a driver by their ID.
     * @param driverID The ID of the driver to retrieve.
     * @return The driver details.
     */
    @GetMapping("/auth/{driverID}")
    public Driver getDriver(@PathVariable String driverID) {
        return service.getDriverByID(driverID);
    }

    /**
     * Retrieves all drivers.
     * @return A list of all drivers.
     */
    @GetMapping("/auth/getAllDriver")
    public ResponseEntity<List<Driver>> getAllDrivers() {
        List<Driver> drivers = service.getAllDrivers();
        return ResponseEntity.ok(drivers);
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
 * Retrieves all available drivers.
 * @return A list of available drivers.
 */
@GetMapping("/auth/availableDrivers")
public ResponseEntity<List<Driver>> getAvailableDrivers() {
    List<Driver> availableDrivers = service.getDriversByStatus("Available");
    return ResponseEntity.ok(availableDrivers);
}

    /**
     * Retrieves a list of drivers based on category ID.
     * @param catID The category ID to filter drivers.
     * @return A list of drivers belonging to the specified category.
     */
    @GetMapping("/auth/category/{catID}")
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