# Use the official OpenJDK image as the base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the jar file into the container
COPY target/*.jar app.jar

# Expose the port your application runs on (default Spring Boot port is 8080)
EXPOSE 8080

# Run the jar file when the container starts
ENTRYPOINT ["java", "-jar", "app.jar"]


