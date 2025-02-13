package com.cabservice.megacity.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Document(collection = "Category")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category {
     @Id
    private String catID;
    private String catType;
    private String catModel;
    private String noOfSeats;
    private String lagguageType;
    private String pricePerKm;
}
