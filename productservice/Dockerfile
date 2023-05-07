FROM eclipse-temurin:17-jdk-alpine
ARG JAR_FILE=target/*.jar
COPY mysql-connector-java-8.0.27.jar /app/

EXPOSE 3001

COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]