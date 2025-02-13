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

   @PostMapping("/create")
   @ResponseStatus(HttpStatus.CREATED)
    public Driver createDriver(@RequestBody Driver driver) {
       return service.createDriver(driver);
   }

   @GetMapping("/{driverID}")
   public Driver getDriver(@PathVariable String driverID){
       return service.getDriverByID(driverID);
   }

   @DeleteMapping("/{driverID}")
   public String deleteDriver(@PathVariable  String driverID){
       return service.deleteDriverByID(driverID);
   }

    @GetMapping("/category/{catID}")
    public List<Driver> getDriversByCategoryId(@PathVariable String catID) {
        System.out.println("Received request for drivers with catID: " + catID);
        return service.getDriversByCategoryId(catID);
    }


    @PutMapping("/{driverID}")
    public ResponseEntity<Driver> updateDriver(@PathVariable String driverID, @RequestBody Driver updatedDriver) {
        Driver driver = service.updateDriver(driverID, updatedDriver);
        return ResponseEntity.ok(driver);
    }
}
