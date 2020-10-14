# pull from maven
FROM maven:3.5.2-jdk-8-alpine AS MAVEN_BUILD

# set working directory
WORKDIR /build/

# install app dependencies
COPY pom.xml /build/
COPY src /build/src/
RUN mvn package
EXPOSE 8080
FROM openjdk:8-jre-alpine
WORKDIR /app

# add app
COPY --from=MAVEN_BUILD /build/target/majorproject-0.0.1-SNAPSHOT.jar /app/
ENTRYPOINT ["java", "-jar", "majorproject-0.0.1-SNAPSHOT.jar"]