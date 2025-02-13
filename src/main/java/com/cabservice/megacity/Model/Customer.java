package com.cabservice.megacity.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "Customer")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    
    @Id
    private String customerId;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String userName;
    private String password;
    private String customerProfile; 
}
