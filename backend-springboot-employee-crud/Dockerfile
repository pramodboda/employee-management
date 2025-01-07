# # Build stage
# FROM maven:3.9.2-openjdk:17-jdk AS build
# WORKDIR /app
# COPY pom.xml .
# COPY src ./src
# RUN mvn clean package -DskipTests
#
# # Runtime stage
# FROM openjdk:17-jdk
# WORKDIR /app
# COPY --from=build /app/target/backend-springboot-employee-crud-0.0.1-SNAPSHOT.jar .
# ENTRYPOINT ["java", "-jar", "backend-springboot-employee-crud-0.0.1-SNAPSHOT.jar"]


FROM eclipse-temurin:17-jdk
ARG JAR_FILE=target/backend-springboot-employee-crud-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
