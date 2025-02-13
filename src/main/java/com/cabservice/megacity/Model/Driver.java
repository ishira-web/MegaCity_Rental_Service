package com.cabservice.megacity.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "Driver")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Driver {
    
     @Id
    private String driverID;
    private String driverName;
    private String driverAddress;
    private String driverPhone;
    private String driverEmail;
    private String userName;
    private String password;
    private String driverStatues;
    private String currentLocation;

    //Get Category ID
    private String catID;


    
}
