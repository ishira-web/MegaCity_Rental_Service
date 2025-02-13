package com.cabservice.megacity.Model;
import java.time.LocalDate;
import java.time.LocalTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "Booking")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {
    
    @Id
    private String bookingId;
    private String pickupLocation;
    private String dropLocation;
    private LocalDate date; // LocalDate for date
    private LocalTime time; // LocalTime for time
    private String customerID;
    private String driverID;
    private String bookingStatus;
}
