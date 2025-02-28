package com.cabservice.megacity.Model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Document(collection = "Category")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Category {
     @Id
    private String catID;
    private String catType;
    private String catModel;
    private String noOfSeats;
    private String pricePerKm;
    private String lagguageType;
}
