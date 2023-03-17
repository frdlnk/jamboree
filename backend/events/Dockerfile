FROM openjdk:17
COPY "./target/events-0.4.0.jar" "app.jar"
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]