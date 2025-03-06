package com.cabservice.megacity.Security.JWT;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import java.security.Key;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.cabservice.megacity.Model.Admin;
import com.cabservice.megacity.Model.Customer;
import com.cabservice.megacity.Model.Driver;
import com.cabservice.megacity.Repository.AdminRepository;
import com.cabservice.megacity.Repository.CustomerRepository;
import com.cabservice.megacity.Repository.DriverRepository;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.*;

@Configuration
public class JwtUtils {


    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private DriverRepository cabsRepository;

    @Autowired
    private AdminRepository adminRepository;
 
    @Value("${app.secret}")
    private String secret;

    private Key key(){

        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secret));  //genarate key wtih secret
    }

    public String generateJwtToken(Authentication authentication) {
    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    
    // Get role
    String role = userDetails.getAuthorities().stream()
        .findFirst()
        .map(GrantedAuthority::getAuthority)
        .orElse("USER");
    
    // Fetch the user from the database to get the ID
    String userId = null;
    
    if (role.equals("ROLE_CUSTOMER")) {
        userId = customerRepository.findByUserName(userDetails.getUsername())
                  .map(Customer::getCustomerId).orElse(null);
    } else if (role.equals("ROLE_DRIVER")) {
        userId = cabsRepository.findByUserName(userDetails.getUsername())
                  .map(Driver::getDriverID).orElse(null);
    } else if (role.equals("ROLE_ADMIN")) {
        userId = adminRepository.findByUserName(userDetails.getUsername())
                  .map(Admin::getAdminID).orElse(null);
    }

    return Jwts.builder()
            
            .setSubject(userDetails.getUsername())
            .claim("role", role)
            .claim("userId", userId)  // Store userId in token
            .claim("userName", userDetails)
            .setIssuedAt(new Date())
            .setExpiration(new Date(new Date().getTime() + 1000 * 60 * 60 * 24)) // 24 hours validity
            .signWith(key(), SignatureAlgorithm.HS256)
            .compact();
}



    public boolean validateJwtToken(String token){

          try {

             Jwts.parserBuilder().setSigningKey(key()).build().parse(token);
             return true;
          }catch (Exception e){

             e.printStackTrace();
             return false;
          }

    }



    public String getUsernameFromJwtToken(String token){


        return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody().getSubject();
    }

    public String getUserIdFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build()
                .parseClaimsJws(token).getBody().get("userId", String.class);
    }
    
}
