package com.cabservice.megacity.Controller;
import java.io.IOException;
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
     * @param driver The driver details received in the request body.
     * @return The created driver.
     */

     
     @PostMapping("/auth/createDriver")
     public Driver createDriver(
         @RequestParam("imageUrl") MultipartFile file,
         @RequestParam("driverName") String driverName,
         @RequestParam("driverEmail") String driverEmail,
         @RequestParam("userName") String userName,
         @RequestParam("password") String password,
         @RequestParam("driverAddress") String driverAddress,
         @RequestParam("driverPhone") String driverPhone,
         @RequestParam("driverStatues") String driverStatues,
         @RequestParam("currentLocation") String currentLocation,
         @RequestParam("catID") String catID
     ) throws IOException {
     
         // Upload image to Cloudinary (if needed)
         String imageUrl = cloudinaryService.uploadImage(file);
     
         // Create and populate the Driver object
         Driver driver = new Driver();
         driver.setDriverName(driverName);
         driver.setDriverEmail(driverEmail);
         driver.setUserName(userName);
         driver.setImageUrl(imageUrl);
         driver.setPassword(passwordEncoder.encode(password)); // Encrypt password
         driver.setDriverAddress(driverAddress);
         driver.setDriverPhone(driverPhone);
         driver.setDriverStatues(driverStatues);
         driver.setCurrentLocation(currentLocation);
         driver.setCatID(catID);
     
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


    /** Get All Drivers **/
    @GetMapping("/auth/getAllDriver")
    public ResponseEntity <List<Driver>> getAllDrivers() {
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
