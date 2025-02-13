package com.cabservice.megacity.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Document(collection = "Driver")
@Getter
@Setter
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
