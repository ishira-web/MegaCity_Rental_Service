package com.cabservice.megacity.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "Customer")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    
    @Id
    private String customerId;
    private String name;
    private String email;
    private String phone;
    private String dob;
    private String userName;
    private String password;
    private String customerProfile; 
    private String nicNumber;
    private String nicFront;
    private String nicBack;


    //otp
    private String otp;
    private long otpGeneratedTime;
}
