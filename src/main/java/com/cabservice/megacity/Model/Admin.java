package com.cabservice.megacity.Model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Admin")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Admin {

    @Id
    private String adminID;
    private String userName;
    private String password;

}
