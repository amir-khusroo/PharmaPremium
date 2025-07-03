# Start with a base image containing Java runtime
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy your JAR file to the container
COPY target/pharma-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your app runs on
EXPOSE 8081

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
