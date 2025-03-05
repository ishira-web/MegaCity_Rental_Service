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
    private String imageUrl; // Driver photo URL
    private String driverStatues;
    private String currentLocation;
    private String catID;
    private String catType;
    private String driverNic;
    private String vehicalNumber;
    private String catModel;
    private String noOfSeats;
    private String acType;
    private String lagguageType;
    private String carImageUrl; // List of car photo URLs
   
   
    
    
}