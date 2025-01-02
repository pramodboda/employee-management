# Use an official OpenJDK runtime as a parent image
FROM openjdk:21.0.4-jdk

# Set the working directory in the container
WORKDIR /app

# Copy the project files to the container
COPY . .

# Package the application
RUN ./mvnw package

# Expose the port the app runs on
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "target/backend-springboot-employee-crud-0.0.1-SNAPSHOT.jar"]
