package com.cabservice.megacity.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Document(collection = "Booking")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    
    @Id
    private String bookingId;
    private String pickupLocation;
    private String customerName;
    private String customerEmail;
    private String dropLocation;
    private String bookingDate; // LocalDate for date
    private String bookingTime; // LocalTime for time
    private String customerId;
    private String driverID;
    private String bookingStatus;
    private String driverStatues;
    private String fare;
    
}
