FROM maven:3.5.2-jdk-8-alpine AS MAVEN_BUILD
WORKDIR /build/
COPY pom.xml /build/
COPY target /build/target/
COPY src /build/src/
RUN mvn package
EXPOSE 8080
FROM openjdk:8-jre-alpine
WORKDIR /app
COPY --from=MAVEN_BUILD /build/target/majorproject-0.0.1-SNAPSHOT.jar /app/
ENTRYPOINT ["java", "-jar", "majorproject-0.0.1-SNAPSHOT.jar"]