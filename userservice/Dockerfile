FROM eclipse-temurin:17-jdk-alpine
ARG JAR_FILE=target/*.jar
# COPY mysql-connector-java-8.0.27.jar /app/

# Bad practice
ENV MYSQL_HOST=localhost \
    MYSQL_PORT=3306 \
    MYSQL_DATABASE=netex \
    MYSQL_USER=netex \
    MYSQL_PASSWORD=netex

EXPOSE 3000

COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]